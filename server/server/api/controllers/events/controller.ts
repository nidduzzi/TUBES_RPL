import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Jimp from 'jimp';
import path from 'path';
import { NewTag } from '../../interfaces/newTag.interface';
import JwtDataStore from '../../interfaces/jwtDataStore.interface';
import { Roles } from '../../interfaces/roles.enum';
import { NewTicketType } from '../../interfaces/newTicketType.interface';
import { NoUndefinedField } from '../../interfaces/noUndefinedField.type';
import { NewSchedule } from '../../interfaces/newSchedule.interface';
import { cleanUp } from '../../services/objectCleanup.service';
const prisma = new PrismaClient();

export class Controller {
  getAll(req: Request, res: Response, next: NextFunction): void {
    let q = undefined;
    if (req.query.q) {
      q = JSON.parse(req.query.q as string);
    }
    let h = undefined;
    if (req.query.h) {
      h = JSON.parse(req.query.h as string);
    }
    const query =
      // check if q is sent
      q
        ? // check if h is sent
          h
          ? // check if h.select is sent
            h.select
            ? prisma.event.findMany({
                where: q,
                select: h.select ?? undefined,
                cursor: h.cursor ?? undefined,
                skip: h.skip ?? h.cursor ? 1 : undefined,
                distinct: h.distinct ?? undefined,
                orderBy: h.orderBy ?? undefined,
                take: h.take ?? undefined,
              })
            : // or if h.include is sent instead
              prisma.event.findMany({
                where: q,
                include: h.include ?? undefined,
                cursor: h.cursor ?? undefined,
                skip: h.skip ?? h.cursor ? 1 : undefined,
                distinct: h.distinct ?? undefined,
                orderBy: h.orderBy ?? undefined,
                take: h.take ?? undefined,
              })
          : // or if h is not sent
            prisma.event.findMany({
              where: q,
            })
        : // or if q isn't sent and then check if h is sent
        h
        ? // check if h.select is sent
          h.select
          ? prisma.event.findMany({
              select: h.select ?? undefined,
              cursor: h.cursor ?? undefined,
              skip: h.skip ?? h.cursor ? 1 : undefined,
              distinct: h.distinct ?? undefined,
              orderBy: h.orderBy ?? undefined,
              take: h.take ?? undefined,
            })
          : // or if h.include is sent instead
            prisma.event.findMany({
              include: h.include ?? undefined,
              cursor: h.cursor ?? undefined,
              skip: h.skip ?? h.cursor ? 1 : undefined,
              distinct: h.distinct ?? undefined,
              orderBy: h.orderBy ?? undefined,
              take: h.take ?? undefined,
            })
        : // or if h is not sent
          prisma.event.findMany();

    query
      .then((events) => {
        // send response
        res.status(200).send({ events: events });
      })
      .catch((err) => next(err));
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);
      prisma.event
        .findUnique({
          where: { id: id },
          include: {
            schedule: true,
            ticketTypes: {
              include: { attributes: { include: { values: true } } },
            },
            images: true,
            tags: true,
            reservations: {
              include: {
                tickets: true,
              },
            },
          },
        })
        .then((event) => {
          if (event) {
            let reservedTickets = 0;
            event.reservations.forEach(
              (reservation) => (reservedTickets += reservation.tickets.length)
            );
            const body = {
              id: event.id,
              name: event.name,
              tagline: event.tagline,
              description: event.description,
              schedule: event.schedule,
              rsvpDeadline: event.rsvpDeadline,
              hasRsvp: event.rsvpDeadline ? true : false,
              eventOrganizerId: event.eventOrganizerId,
              tags: event.tags,
              maxTickets: event.maxTickets,
              unlimitedTickets: event.unlimitedTickets,
              reservedTickets: reservedTickets,
              ticketTypes: event.ticketTypes,
              hasLogo: event.logo ? true : false,
              numImages: event.images.length,
            };
            res.status(200).send({ event: body });
          } else {
            res.status(404).send({ message: 'id not found' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid id given' });
    }
  }

  postNewEvent(req: Request, res: Response, next: NextFunction): void {
    const user = req.user as JwtDataStore;
    const eoScope = user.scopes.find(
      (scope) => scope.role == Roles.EventOrganizer
    );
    if (typeof req.body == 'string') {
      req.body = JSON.parse(req.body);
    }
    if (
      req.body.name &&
      req.body.description &&
      req.body.schedule != [] &&
      req.body.hasRsvp != undefined &&
      req.body.ticketTypes != [] &&
      req.body.tags != [] &&
      eoScope?.id != undefined
    ) {
      const tmp = req.body.tags as Array<NoUndefinedField<NewTag>>;
      cleanUp(tmp);
      const newTicketTypes = req.body.ticketTypes as Array<NewTicketType>;
      cleanUp(newTicketTypes);
      const tagNames = tmp.map((nt) => {
        return { name: nt.name };
      });
      prisma.tag
        .findMany({
          where: {
            OR: [
              { name: { in: tagNames.map((n) => n.name) } },
              { id: { in: tmp.map((t) => t.id) } },
            ],
          },
        })
        .then(async (tags) => {
          const eo = await prisma.eventOrganizer.findUnique({
            where: { id: eoScope.id },
          });
          if (eo) {
            // tags submitted are all in the database
            if (tags.length == tmp.length) {
              // create event
              const schedule = req.body.schedule as Array<
                NoUndefinedField<NewSchedule>
              >;
              cleanUp(schedule);
              prisma.event
                .create({
                  data: {
                    name: req.body.name,
                    description: req.body.description,
                    hasRsvp: req.body.hasRsvp,
                    rsvpDeadline: new Date(req.body.rsvpDeadline),
                    unlimitedTickets: req.body.unlimitedTickets,
                    schedule: {
                      create: schedule,
                    },
                    eventOrganizer: {
                      connect: { id: eo.id },
                    },
                    maxTickets: req.body.maxTickets,
                    tagline: req.body.tagline,
                    tags: {
                      connect: tagNames,
                    },
                    ticketTypes: {
                      create: newTicketTypes.map((ntt) => {
                        const r = {
                          name: ntt.name,
                          description: ntt.description,
                          price: ntt.price,
                          attributes: {
                            create: ntt.attributes.map((a) => {
                              const r = {
                                name: a.name,
                                values: {
                                  createMany: {
                                    data: a.values.map((v) => {
                                      return { value: v.value };
                                    }),
                                  },
                                },
                              };
                              cleanUp(r);
                              return r;
                            }),
                          },
                          currency: ntt.currency,
                        };
                        cleanUp(r);
                        return r;
                      }),
                    },
                  },
                })
                .then((event) => {
                  if (event) {
                    // get the event connected to it's ticketType(s)
                    prisma.event
                      .findUnique({
                        where: { id: event.id },
                        include: {
                          schedule: true,
                          tags: true,
                          reservations: { include: { tickets: true } },
                          ticketTypes: {
                            include: {
                              attributes: { include: { values: true } },
                            },
                          },
                        },
                      })
                      .then((event) => {
                        if (event) {
                          // return event details
                          res.status(201).send({ event: event });
                        } else {
                          // event errored out while creating
                          res.status(500).send({
                            message: "couldn't create event correctly",
                          });
                        }
                      })
                      .catch((err) => next(err));
                  } else {
                    // event errored out while creating
                    res.status(500).send({
                      message: "couldn't create event correctly",
                    });
                  }
                })
                .catch((err) => next(err));
            } // tags submitted not all in database
            else {
              res.status(400).send({ message: 'tags not in database' });
            }
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({
        message: 'invalid new event',
        details: {
          name: req.body.name ? true : false,
          description: req.body.description ? true : false,
          schedule: req.body.schedule != [] ? true : false,
          hasRsvp: req.body.hasRsvp != undefined ? true : false,
          ticketTypes: req.body.ticketTypes != [] ? true : false,
          tags: req.body.tags != [] ? true : false,
          eoId: eoScope?.id != undefined ? true : false,
        },
      });
    }
  }

  getReservations(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);
      prisma.event
        .findUnique({
          where: { id: id },
          include: { reservations: true },
        })
        .then((event) => {
          if (event) {
            res.status(200).send({ reservations: event.reservations });
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(404).send({ message: 'invalid id given' });
    }
  }

  getLogo(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);
      prisma.event
        .findUnique({ where: { id: id }, select: { logo: true } })
        .then((event) => {
          if (event) {
            if (event.logo) {
              res.status(200).contentType('image/png').send(event.logo);
            } else {
              Jimp.read(
                path.join(__dirname, '../../../../public/defaultLogo.png')
              ).then((def) => {
                def.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
                  if (err) {
                    console.log(err);
                    next(err);
                  } else {
                    res.status(200).contentType('image/png').send(buffer);
                  }
                });
              });
            }
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(404).send({ message: 'invalid id given' });
    }
  }

  putLogo(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined && req.body) {
      const id = Number.parseInt(req.params.id);
      prisma.event
        .findUnique({ where: { id: id } })
        .then((event) => {
          if (event) {
            // update logo
            if (req.file != undefined && req.file.buffer != undefined) {
              if (req.file.size <= 5000000) {
                // convert image to jpeg
                Jimp.read(req.file.buffer)
                  .then((img) => {
                    // resize image
                    img.cover(
                      256,
                      256,
                      Jimp.VERTICAL_ALIGN_MIDDLE | Jimp.HORIZONTAL_ALIGN_CENTER
                    );
                    img.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                      if (err) {
                        console.log(err);
                        next(err);
                      } else {
                        prisma.event
                          .update({
                            where: { id: event.id },
                            data: {
                              logo: buffer,
                            },
                          })
                          .then((_) => {
                            res.status(200).send({
                              message: 'logo updated',
                            });
                          })
                          .catch((error) => {
                            next(error);
                          });
                      }
                    });
                  })
                  .catch((error) => {
                    next(error);
                  });
              } else {
                res.status(400).send({ message: 'file larger than 5mb' });
              }
            } else {
              res.status(400).send({ message: 'invalid file given' });
            }
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  deleteLogo(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id) {
      const id = Number.parseInt(req.params.id);
      prisma.event
        .findUnique({ where: { id: id } })
        .then((event) => {
          if (event) {
            // delete logo
            prisma.event
              .update({
                where: { id: event.id },
                data: { logo: null },
              })
              .then((_) => {
                res.status(200).send({ message: 'logo deleted' });
              })
              .catch((err) => next(err));
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  getImage(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id && req.params.imageNumber) {
      const id: number = Number.parseInt(req.params.id);
      const imageNumber: number = Number.parseInt(req.params.imageNumber);
      prisma.event
        .findUnique({
          where: { id: id },
          include: { images: true },
        })
        .then((event) => {
          if (event && event.images[imageNumber]) {
            res
              .status(200)
              .contentType(Jimp.MIME_PNG)
              .send(event.images[imageNumber].image);
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(404).send({ message: 'invalid id given' });
    }
  }

  putImage(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id && req.params.imageNumber) {
      const id: number = Number.parseInt(req.params.id);
      const imageNumber: number = Number.parseInt(req.params.imageNumber);
      prisma.event
        .findUnique({
          where: { id: id },
          include: { images: true },
        })
        .then((event) => {
          if (event && event.images[imageNumber]) {
            // update image
            if (req.file != undefined && req.file.buffer != undefined) {
              // convert image to jpeg
              Jimp.read(req.file.buffer)
                .then((img) => {
                  img.cover(
                    512,
                    512,
                    Jimp.VERTICAL_ALIGN_MIDDLE | Jimp.HORIZONTAL_ALIGN_CENTER
                  );
                  img.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                    if (err) {
                      console.log(err);
                      next(err);
                    } else {
                      prisma.eventImage
                        .update({
                          where: { id: event.images[imageNumber].id },
                          data: {
                            image: buffer,
                          },
                        })
                        .then((_) => {
                          res.status(200).send({
                            message: 'image updated',
                          });
                        })
                        .catch((error) => {
                          next(error);
                        });
                    }
                  });
                })
                .catch((error) => {
                  next(error);
                });
            } else {
              res.status(400).send({ message: 'invalid file given' });
            }
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  deleteImage(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id && req.params.imageNumber) {
      const id: number = Number.parseInt(req.params.id);
      const imageNumber: number = Number.parseInt(req.params.imageNumber);
      prisma.event
        .findUnique({
          where: { id: id },
          include: { images: true },
        })
        .then((event) => {
          if (event && event.images[imageNumber]) {
            // delete image
            prisma.event
              .update({
                where: { id: event.id },
                data: {
                  images: {
                    delete: {
                      id: event.images[imageNumber].id,
                    },
                  },
                },
              })
              .then((_) => {
                res.status(200).send({ message: 'image deleted' });
              })
              .catch((err) => next(err));
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  postImage(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id) {
      const id: number = Number.parseInt(req.params.id);
      prisma.event
        .findUnique({
          where: { id: id },
        })
        .then((event) => {
          if (event) {
            // update image
            const files = req.files as Express.Multer.File[];
            if (files != undefined && files != []) {
              // convert image to jpeg
              Promise.all(
                files.map(async (file) => {
                  return Jimp.read(file.buffer)
                    .then((img) => {
                      img
                        .cover(
                          512,
                          512,
                          Jimp.VERTICAL_ALIGN_MIDDLE |
                            Jimp.HORIZONTAL_ALIGN_CENTER
                        )
                        .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                          if (err) {
                            console.log(err);
                            next(err);
                          } else {
                            prisma.eventImage
                              .create({
                                data: {
                                  image: buffer,
                                  event: {
                                    connect: { id: event.id },
                                  },
                                },
                              })
                              .catch((error) => {
                                next(error);
                              });
                          }
                        });
                    })
                    .catch((error) => {
                      next(error);
                    });
                })
              )
                .then((_) => {
                  res.status(200).send({
                    message: 'images uploaded',
                  });
                })
                .catch((err) => next(err));
            } else {
              res.status(400).send({ message: 'invalid file given' });
            }
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  putUpdateEvent(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined && req.body) {
      const id = Number.parseInt(req.params.id);
      let body = req.body;

      if (typeof body == 'string') {
        body = JSON.parse(body);
      }
      prisma.event
        .findUnique({
          where: { id: id },
          include: {
            schedule: true,
            tags: true,
            ticketTypes: {
              include: { attributes: { include: { values: true } } },
            },
          },
        })
        .then(async (event) => {
          if (event) {
            // update name
            if (body.name && typeof body.name === 'string') {
              const name = await prisma.event.findUnique({
                where: { name: body.name },
              });
              if (name && name.id != event.id) {
                res.status(409).send({ message: 'name already taken' });
                return;
              }
              await prisma.event.update({
                where: { id: event.id },
                data: { name: body.name },
              });
            }
            // update schedule
            if (body.schedule && body.schedule != []) {
              const schedule = body.schedule as Array<
                NoUndefinedField<NewSchedule>
              >;
              cleanUp(schedule);
              await prisma.schedule.deleteMany({
                where: { eventId: event.id },
              });
              await prisma.event.update({
                where: { id: event.id },
                data: { schedule: { create: schedule } },
              });
            }
            // update description
            if (
              typeof body.description === 'string' &&
              body.description !== ''
            ) {
              await prisma.event.update({
                where: { id: event.id },
                data: {
                  description: body.description,
                },
              });
            }
            // update rsvpDeadline
            if (
              typeof body.rsvpDeadline === 'string' ||
              body.rsvpDeadline === null
            ) {
              await prisma.event.update({
                where: { id: event.id },
                data: {
                  rsvpDeadline: body.rsvpDeadline
                    ? new Date(body.rsvpDeadline)
                    : null,
                  hasRsvp: body.rsvpDeadline ? true : false,
                },
              });
            }
            // update maxTickets & unlimitedTickets
            if (
              typeof body.maxTickets === 'number' ||
              body.maxTickets === null
            ) {
              await prisma.event.update({
                where: { id: event.id },
                data: {
                  maxTickets: body.maxTickets,
                  unlimitedTickets: body.maxTickets ? false : true,
                },
              });
            }
            // update tagline
            if (typeof body.tagline === 'string' || body.tagline === null) {
              await prisma.event.update({
                where: { id: event.id },
                data: {
                  tagline: body.tagline,
                },
              });
            }
            // update ticketTypes
            if (body.ticketTypes != undefined && body.ticketTypes != []) {
              const newTicketTypes = req.body.ticketTypes as Array<
                NoUndefinedField<NewTicketType>
              >;
              cleanUp(newTicketTypes);
              // delete connected attribute values
              await prisma.ticketTypeAttributeValue.deleteMany({
                where: {
                  attribute: { ticketType: { eventId: event.id } },
                },
              });
              // delete connected attributes
              await prisma.ticketTypeAttribute.deleteMany({
                where: {
                  ticketType: { eventId: event.id },
                },
              });
              // delete connected ticket types
              await prisma.ticketType.deleteMany({
                where: { eventId: event.id },
              });
              // insert the new ticket types, their attributes and values
              const tt = newTicketTypes.map((ntt) => {
                const r = {
                  name: ntt.name,
                  description: ntt.description,
                  price: ntt.price,
                  attributes: {
                    create: ntt.attributes.map((a) => {
                      const r = {
                        name: a.name,
                        values: {
                          createMany: {
                            data: a.values.map((v) => {
                              return { value: v.value };
                            }),
                          },
                        },
                      };
                      cleanUp(r);
                      return r;
                    }),
                  },
                  currency: ntt.currency,
                };
                cleanUp(r);
                return r;
              });
              if (tt && tt != []) {
                await prisma.event.update({
                  where: { id: event.id },
                  data: {
                    ticketTypes: {
                      create: tt,
                    },
                  },
                });
              }
            }
            // respond with updated event
            prisma.event
              .findUnique({
                where: { id: event.id },
                include: {
                  schedule: true,
                  reservations: { include: { tickets: true } },
                  tags: true,
                  ticketTypes: {
                    include: { attributes: { include: { values: true } } },
                  },
                  images: true,
                },
              })
              .then((updatedEvent) => {
                if (updatedEvent) {
                  let reservedTickets = 0;
                  updatedEvent.reservations.forEach(
                    (reservation) =>
                      (reservedTickets += reservation.tickets.length)
                  );
                  const body = {
                    id: updatedEvent.id,
                    name: updatedEvent.id,
                    tagline: updatedEvent.tagline,
                    description: updatedEvent.description,
                    schedule: updatedEvent.schedule,
                    rsvpDeadline: updatedEvent.rsvpDeadline,
                    hasRsvp: updatedEvent.hasRsvp,
                    eventOrganizerId: updatedEvent.eventOrganizerId,
                    tags: updatedEvent.tags,
                    maxTickets: updatedEvent.maxTickets,
                    unlimitedTickets: updatedEvent.unlimitedTickets,
                    reservedTickets: reservedTickets,
                    public: true,
                    reservations: updatedEvent.reservations,
                    ticketTypes: updatedEvent.ticketTypes,
                    hasLogo: updatedEvent.logo ? true : false,
                    numImages: updatedEvent.images.length,
                  };
                  cleanUp(body);
                  res.status(200).send({ event: body });
                } else {
                  res.status(500).send({
                    message: "server couldn't update event properly",
                  });
                }
              })
              .catch((error) => {
                next(error);
              });
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }
}
export default new Controller();
