import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Controller {
  postCreate(req: Request, res: Response, next: NextFunction): void {
    if (req.body.id_reservation != undefined) {
      const id: number = req.body.id_reservation;

      prisma.reservation
        .findUnique({
          where: {
            id: id,
          },
          include: {
            Event: true,
          },
        })
        .then((rsv) => {
          if (rsv) {
            if (
              (rsv.Event.rsvpDeadline &&
                rsv.Event.rsvpDeadline >= new Date()) ||
              !rsv.Event.hasRsvp
            ) {
              prisma.payment
                .create({
                  data: {
                    amount: rsv.price,
                    currency: rsv.Event.currency,
                    reservation: {
                      connect: {
                        id: rsv.id,
                      },
                    },
                  },
                })
                .then((p) => {
                  if (
                    rsv.price == 0 ||
                    process.env.PAYMENT_PROVIDER == undefined ||
                    process.env.PAYMENT_PROVIDER == ''
                  ) {
                    prisma.reservation
                      .update({
                        where: {
                          id: rsv.id,
                        },
                        data: {
                          status: 'CONFIRMED',
                        },
                      })
                      .then(() => res.status(201).send({ payment_intent: p }))
                      .catch((err) => next(err));
                  } else {
                    res.status(201).send({ payment_intent: p });
                  }
                })
                .catch((err) => next(err));
            } else {
              prisma.reservation
                .update({
                  where: {
                    id: rsv.id,
                  },
                  data: {
                    status: 'CANCELED',
                  },
                })
                .then(() => {
                  res.status(400).send({
                    message:
                      "the event's deadline has been passed, so the reservation has been canceled",
                  });
                })
                .catch((err) => next(err));
            }
          } else {
            res.status(404).send({ message: 'invalid reservation id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  putUpdate(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined && req.body.result) {
      const id = Number.parseInt(req.params.id);
      if (req.body.result.success && id >= 0 && id != NaN) {
        prisma.payment
          .update({
            where: { id: id },
            data: {
              completed: true,
              reservation: { update: { status: 'CONFIRMED' } },
            },
          })
          .then((_) => res.status(204).send())
          .catch((err) => next(err));
      } else {
        res.status(404).send({ message: 'invalid id or request body given' });
      }
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id: number = Number.parseInt(req.params.id);

      prisma.payment
        .findUnique({
          where: {
            id: id,
          },
        })
        .then((p) => {
          if (p) {
            res.status(200).send({ payment: p });
          } else {
            res.status(404).send({ message: 'invalid payment id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }
}
export default new Controller();
