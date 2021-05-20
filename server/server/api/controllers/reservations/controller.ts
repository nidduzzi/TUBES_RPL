import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { EventOrganizer, Prisma, PrismaClient, User } from '@prisma/client';
import JwtDataStore from '../../interfaces/jwtDataStore.interface';
import emailService from '../../services/email.service';
import { Roles } from '../../interfaces/roles.enum';
import Jimp from 'jimp';
import path from 'path';
import { strToMilis } from '../../services/strToMilis.service';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export class Controller {
  postCreate(req: Request, res: Response, next: NextFunction): void {
    if (req.body.eventId != undefined && req.body.tickets != undefined && req.body.currency != undefined) {
      const eventId: number = req.body.eventId;
      const tickets = req.body.tickets;
      const currency: string = req.body.currency;
      let totalPrice: number = 0;

      prisma.event
        .findUnique({
          where: {
            id: eventId
          }
        })
        .then((evt) => {
          if (evt) {
            prisma.ticketType
              .findMany({
                where: {
                  eventId: evt.id
                },
                select: {
                  price: true
                }
              })
              .then((ttp) => {
                if (ttp) {
                  ttp.forEach((e) => {
                    totalPrice += e.price;
                  })

                  const user = req.user as JwtDataStore;
                  const userScope = user.scopes.find((scope, _i, _obj) => {
                    return scope.role == Roles.User;
                  });

                  prisma.reservation
                    .create({
                      data: {
                        price: totalPrice,
                        orderDate: new Date(),
                        status: 'WAITING',
                        user: {
                          connect: {
                            id: userScope?.id
                          }
                        },
                        Event: {
                          connect: {
                            id: evt.id
                          }
                        }
                      }
                    })
                    .then((rsv) => {
                      prisma.ticket
                        .createMany({
                          data: tickets.map((t: {
                            nama: string;
                            identification: string;
                            identificationNumber: string;
                            ticketTypeId: number;
                          }) => {
                            return {
                              nama: t.nama,
                              identification: t.identification,
                              identificationNumber: t.identificationNumber,
                              ticketTypeId: t.ticketTypeId,
                              reservationId: rsv.id
                            }
                          })
                        })
                        .then(() => {
                          res.status(201).send({
                            reservation: {
                              id: rsv.id,
                              id_user: rsv.userId,
                              uuid: uuidv4(),
                              tickets: tickets,
                              confirmed: false,
                              price: rsv.price,
                            }
                          })
                        })
                        .catch((err) => next(err));
                    })
                    .catch((err) => next(err));
                } else {
                  res.status(404).send({ message: 'invalid ticket type id given' });
                }
              })
              .catch((err) => next(err));
          } else {
            res.status(404).send({ message: 'invalid event id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);
      prisma.reservation
        .findUnique({
          where: { id: id },
          include: {
            tickets: true
          }
        })
        .then((rsv) => {
          if (rsv) {
            res.status(200).send({ reservation: rsv });
          } else {
            res.status(404).send({ message: 'invalid reservation id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid id given' });
    }
  }

  putUpdate(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined && req.body.tickets != undefined) {
      const id = Number.parseInt(req.params.id);

      prisma.reservation
        .findUnique({
          where: {
            id: id
          }
        })
        .then((rsv) => {
          if (rsv) {
            prisma.ticket
              .deleteMany({
                where: {
                  reservationId: rsv.id
                }
              })
              .then(() => {
                const tickets = req.body.tickets;

                prisma.ticket
                  .createMany({
                    data: tickets
                  })
                  .then(() => {
                    prisma.reservation
                      .findUnique({
                        where: {
                          id: rsv.id
                        },
                        include: {
                          tickets: true
                        }
                      })
                      .then((updatedReservation) => {
                        res.status(200).send({ reservation: updatedReservation });
                      })
                      .catch((err) => next(err));
                  })
                  .catch((err) => next(err));
              })
              .catch((err) => next(err));
          } else {
            res.status(404).send({ message: 'invalid reservation id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  putCancel(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);

      prisma.reservation
        .findUnique({
          where: {
            id: id
          },
          select: {
            id: true,
            status: true
          }
        })
        .then((rsv) => {
          if (rsv) {
            if (rsv.status == 'CANCELED') {
              res.status(400).send({ message: 'reservation already canceled' });
            } else if (rsv.status == 'CONFIRMED') {
              res.status(400).send({ message: 'reservation already confirmed' });
            } else {
              prisma.reservation
                .update({
                  where: {
                    id: rsv.id
                  },
                  data: {
                    status: 'CANCELED'
                  }
                })
                .then((rsv) => {
                  res.status(200).send({ reservation: rsv });
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

  deleteCancel(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);

      prisma.reservation
        .findUnique({
          where: {
            id: id
          },
          select: {
            id: true,
            status: true
          }
        })
        .then((rsv) => {
          if (rsv) {
            if (rsv.status != 'CANCELED') {
              res.status(400).send({ message: 'reservation has not been canceled' });
            } else {
              prisma.reservation
                .update({
                  where: {
                    id: rsv.id
                  },
                  data: {
                    status: 'WAITING'
                  }
                })
                .then((rsv) => {
                  res.status(200).send({ reservation: rsv });
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
}
export default new Controller();
