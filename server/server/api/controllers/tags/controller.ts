import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

export class Controller {
  getAll(_req: Request, res: Response, next: NextFunction): void {
    prisma.tag
      .findMany({
        include: {
          events: {
            include: {
              reservations: { include: { tickets: true } },
              images: true,
            },
          },
        },
      })
      .then((tags) => {
        // send response
        res.status(200).send({
          tags: tags.map((tag) => {
            return {
              id: tag.id,
              name: tag.name,
              description: tag.description,
              events: tag.events.map((e) => {
                let numTickets = 0;
                e.reservations.forEach((r) => (numTickets += r.tickets.length));
                return {
                  id: e.id,
                  name: e.name,
                  tagline: e.tagline,
                  description: e.description,
                  maxTickets: e.maxTickets,
                  unlimitedTickets: e.unlimitedTickets,
                  reservedTickets: numTickets,
                  hasRsvp: e.hasRsvp,
                  rsvpDeadline: e.rsvpDeadline,
                  eventOrganizerId: e.eventOrganizerId,
                  currency: e.currency,
                  status: e.status,
                  hasLogo: e.logo ? true : false,
                  numImages: e.images.length,
                };
              }),
            };
          }),
        });
      })
      .catch((err) => next(err));
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);
      prisma.tag
        .findUnique({
          where: { id: id },
          include: {
            events: {
              include: {
                reservations: { include: { tickets: true } },
                images: true,
              },
            },
          },
        })
        .then((tag) => {
          if (tag) {
            res.status(200).send({
              tag: {
                id: tag.id,
                name: tag.name,
                description: tag.description,
                events: tag.events.map((e) => {
                  let numTickets = 0;
                  e.reservations.forEach(
                    (r) => (numTickets += r.tickets.length)
                  );
                  return {
                    id: e.id,
                    name: e.name,
                    tagline: e.tagline,
                    description: e.description,
                    maxTickets: e.maxTickets,
                    unlimitedTickets: e.unlimitedTickets,
                    reservedTickets: numTickets,
                    hasRsvp: e.hasRsvp,
                    rsvpDeadline: e.rsvpDeadline,
                    eventOrganizerId: e.eventOrganizerId,
                    currency: e.currency,
                    status: e.status,
                    hasLogo: e.logo ? true : false,
                    numImages: e.images.length,
                  };
                }),
              },
            });
          } else {
            res.status(404).send({ message: 'id not found' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid id given' });
    }
  }

  postCreate(req: Request, res: Response, next: NextFunction): void {
    const name: string = req.body.name;
    const description: string = req.body.description;
    if (name && description) {
      prisma.tag
        .findUnique({
          where: { name: name },
        })
        .then((tag) => {
          if (tag) {
            res.status(409).send({ message: 'tag name already exists' });
          } else {
            prisma.tag
              .create({
                data: {
                  name: name,
                  description: description,
                },
              })
              .then((t) => {
                res.status(201).send({
                  tag: t,
                });
              })
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid name or description' });
    }
  }

  getByIdEvents(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);
      prisma.tag
        .findUnique({
          where: { id: id },
          include: {
            events: {
              include: {
                images: true,
                reservations: { include: { tickets: true } },
              },
            },
          },
        })
        .then((tag) => {
          if (tag) {
            res.status(200).send({
              events: tag.events.map((e) => {
                let numTickets = 0;
                e.reservations.forEach((r) => (numTickets += r.tickets.length));
                return {
                  id: e.id,
                  name: e.name,
                  tagline: e.tagline,
                  description: e.description,
                  maxTickets: e.maxTickets,
                  unlimitedTickets: e.unlimitedTickets,
                  reservedTickets: numTickets,
                  hasRsvp: e.hasRsvp,
                  rsvpDeadline: e.rsvpDeadline,
                  eventOrganizerId: e.eventOrganizerId,
                  currency: e.currency,
                  status: e.status,
                  hasLogo: e.logo ? true : false,
                  numImages: e.images.length,
                };
              }),
            });
          } else {
            res.status(404).send({ message: 'id not found' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid id given' });
    }
  }
}
export default new Controller();
