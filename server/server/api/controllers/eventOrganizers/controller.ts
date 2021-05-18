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

const prisma = new PrismaClient();

function generateEmailVerificationToken(eo: EventOrganizer): string {
  return jwt.sign(
    { id: eo.id, email: eo.email },
    process.env.SESSION_SECRET ?? 'MySecret',
    {
      expiresIn: '1d',
      algorithm: 'HS256',
    }
  );
}

function sendVerificationEmail(req: Request, eo: EventOrganizer) {
  const token = generateEmailVerificationToken(eo);
  const verificationLink: string =
    'http://' +
    req.hostname +
    ':' +
    process.env.PORT +
    '/api/v1/users/verify-email/' +
    token;
  const emailHtml: string =
    '<h2>Verification Link</h2><br><p>Link: ' +
    verificationLink +
    '</p><br><p>Token: ' +
    token +
    '</p><br>';
  emailService(eo.email, 'Ticketin Email Verification', emailHtml);
}

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
            ? prisma.eventOrganizer.findMany({
              where: q,
              select: h.select ?? undefined,
              cursor: h.cursor ?? undefined,
              skip: h.skip ?? h.cursor ? 1 : undefined,
              distinct: h.distinct ?? undefined,
              orderBy: h.orderBy ?? undefined,
              take: h.take ?? undefined,
            })
            : // or if h.include is sent instead
            prisma.eventOrganizer.findMany({
              where: q,
              include: h.include ?? undefined,
              cursor: h.cursor ?? undefined,
              skip: h.skip ?? h.cursor ? 1 : undefined,
              distinct: h.distinct ?? undefined,
              orderBy: h.orderBy ?? undefined,
              take: h.take ?? undefined,
            })
          : // or if h is not sent
          prisma.eventOrganizer.findMany({
            where: q,
          })
        : // or if q isn't sent and then check if h is sent
        h
          ? // check if h.select is sent
          h.select
            ? prisma.eventOrganizer.findMany({
              select: h.select ?? undefined,
              cursor: h.cursor ?? undefined,
              skip: h.skip ?? h.cursor ? 1 : undefined,
              distinct: h.distinct ?? undefined,
              orderBy: h.orderBy ?? undefined,
              take: h.take ?? undefined,
            })
            : // or if h.include is sent instead
            prisma.eventOrganizer.findMany({
              include: h.include ?? undefined,
              cursor: h.cursor ?? undefined,
              skip: h.skip ?? h.cursor ? 1 : undefined,
              distinct: h.distinct ?? undefined,
              orderBy: h.orderBy ?? undefined,
              take: h.take ?? undefined,
            })
          : // or if h is not sent
          prisma.eventOrganizer.findMany({});

    query
      .then((eo) => {
        // send response
        res.status(200).send({ users: eo });
      })
      .catch((err) => next(err));
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);
      prisma.eventOrganizer
        .findUnique({
          where: { id: id },
        })
        .then((eo) => {
          if (eo) {
            res.status(200).send({ eventOrganizer: eo });
          } else {
            res.status(404).send({ message: 'id not found' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid id given' });
    }
  }

  postRegister(req: Request, res: Response, next: NextFunction): void {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const phone: string = req.body.phone;
    const address: string = req.body.address;

    const user = req.user as JwtDataStore;
    const eventOrganizerScope = user.scopes.find((scope) => {
      return scope.role == Roles.EventOrganizer;
    })

    if (eventOrganizerScope) {
      res.status(400).send({ message: 'already registered as event organizer' })
    } else {
      if (name && email && phone && address) {
        prisma.eventOrganizer.
          findFirst({
            where: { OR: [{ email: email }, { name: name }] }
          })
          .then((eo) => {
            if (eo) {
              res.status(400).send({ message: 'username or email exists' });
            } else {
              prisma.eventOrganizer
                .create({
                  data: {
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    verified: false,
                    emailVerified: false,
                    status: 'INACTIVE'
                  }
                })
                .then((eo) => {
                  sendVerificationEmail(req, eo);
                  const userScope = user.scopes.find((scope) => {
                    return scope.role == Roles.User;
                  })

                  prisma.user
                    .update({
                      where: {
                        id: userScope?.id
                      },
                      data: {
                        eventOrganizer: {
                          connect: {
                            id: eo.id
                          }
                        }
                      }
                    })
                    .then(() => {
                      res.status(200).send({
                        id: eo.id,
                        name: eo.name,
                        email: eo.email,
                        phone: eo.phone,
                        address: eo.address,
                        verify: eo.verified
                      })
                    })
                    .catch((err) => next(err));

                })
                .catch((err) => next(err));
            }
          })
          .catch((err) => next(err));
      } else {
        res.status(400)
          .send({ message: 'invalid username or email or password' });
      }
    }
  }

  async putUpdateEO(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.params.id != undefined && req.body) {
      const id = Number.parseInt(req.params.id);
      let body = req.body;

      if (typeof body == 'string') {
        body = JSON.parse(body);
      }
      try {
        const eo = await prisma.eventOrganizer.findUnique({ where: { id: id } });
        if (eo) {
          // update email
          if (body.email) {
            const email = await prisma.eventOrganizer.findUnique({
              where: { email: body.email },
            });
            if (email && email.id != eo.id) {
              res.status(409).send({ message: 'email already taken' });
              return;
            }
            prisma.eventOrganizer.update({
              where: { id: eo.id },
              data: { email: body.email },
            });
          }
          // update username
          if (body.name) {
            const name = await prisma.eventOrganizer.findUnique({
              where: { name: body.name },
            });
            if (name && name.id != name.id) {
              res.status(409).send({ message: 'name already taken' });
              return;
            }
            prisma.eventOrganizer.update({
              where: { id: eo.id },
              data: { name: body.name },
            });
          }

          // update profile picture
          if (req.file != undefined && req.file.buffer != undefined) {
            // convert image to jpeg
            Jimp.read(req.file.buffer)
              .then((img) => {
                img.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
                  if (err) {
                    console.log(err);
                    next(err);
                  } else {
                    prisma.eventOrganizer.update({
                      where: { id: eo.id },
                      data: {
                        profilPicture: buffer,
                      },
                    });
                  }
                });
              })
              .catch((error) => {
                next(error);
              });
          }
          // respond with updated user
          prisma.eventOrganizer
            .findUnique({ where: { id: eo.id } })
            .then((updatedEO) => {
              if (updatedEO) {
                res.status(200).send({
                  eventOrganizer: {
                    id: updatedEO.id,
                    name: updatedEO.name,
                    email: updatedEO.email,
                    emailVerified: updatedEO.emailVerified,
                    verificationDate: updatedEO.verificationDate?.toISOString(),
                    profilePicture: updatedEO.profilPicture?.toString(),
                  },
                });
              }
            })
            .catch((error) => {
              next(error);
            });
          return;
        }
      } catch (error) {
        next(error);
      }
      res.send(404).send({ message: 'invalid id given' });
      return;
    }
    res.status(400).send({ message: 'invalid request' });
  }

  getEvents(req: Request, res: Response, next: NextFunction): void {
    const id = Number.parseInt(req.params['id']);
    if (id) {
      prisma.eventOrganizer
        .findUnique({
          where: {
            id: id
          }
        })
        .then((eo) => {
          prisma.event
            .findMany({
              where: {
                eventOrganizerId: eo?.id
              },
              select: {
                id: true,
                name: true,
                tagline: true,
                description: true,
                logo: true,
                rsvpDeadline: true,
                hasRsvp: true,
                eventOrganizerId: false
              }
            })
            .then((events) => {
              res.status(200).send({ events: events });
            })
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  putVerifyEO(req: Request, res: Response, next: NextFunction): void {
    const id = Number.parseInt(req.params['id']);

    if (id) {
      prisma.eventOrganizer
        .findUnique({
          where: {
            id: id
          }
        })
        .then((eo) => {
          if (!eo?.verified) {
            prisma.eventOrganizer
              .update({
                where: {
                  id: eo?.id
                },
                data: {
                  verified: true,
                  verificationDate: new Date(Date.now()),
                  status: 'ACTIVE'
                }
              })
              .then((eo) => {
                res.status(204).send({ eventOrganizer: eo });
              });
          } else {
            res.status(400).send({ message: 'event organizer already verified' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  deleteVerifyEO(req: Request, res: Response, next: NextFunction): void {
    const id = Number.parseInt(req.params['id']);

    if (id) {
      prisma.eventOrganizer
        .findUnique({
          where: {
            id: id
          }
        })
        .then((eo) => {
          if (eo?.verified) {
            prisma.eventOrganizer
              .update({
                where: {
                  id: eo?.id
                },
                data: {
                  verified: false,
                  verificationDate: null,
                  status: 'INACTIVE'
                }
              })
              .then((eo) => {
                res.status(204).send({ eventOrganizer: eo });
              });
          } else {
            res.status(400).send({ message: 'event organizer already unverified' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  getVerifyEmail(req: Request, res: Response, next: NextFunction): void {
    if (req.params.token) {
      const token: string = req.params.token;
      if (token.length > 0) {
        try {
          jwt.verify(
            token,
            process.env.SESSION_SECRET ?? 'MySecret',
            {
              algorithms: ['HS256'],
            },
            (err, payload: any) => {
              if (err) {
                return next(err);
              }
              if (payload && payload.id && payload.email) {
                prisma.eventOrganizer
                  .findUnique({
                    where: {
                      id:
                        typeof payload.id == 'number'
                          ? payload.id
                          : Number.parseInt(payload.id),
                    },
                  })
                  .then((eo) => {
                    if (eo) {
                      if (!eo.emailVerified && eo.email == payload.email) {
                        prisma.eventOrganizer
                          .update({
                            where: { id: eo.id },
                            data: { emailVerified: true },
                          })
                          .then(() => {
                            res.status(200).send({ message: 'email verified' });
                          });
                      } else {
                        res
                          .status(404)
                          .send({ message: 'email already verified' });
                      }
                    } else {
                      res.status(404).send({ message: 'invalid token given' });
                    }
                  })
                  .catch((err) => next(err));
              } else {
                res.status(404).send({ message: 'invalid token given' });
              }
            }
          );
        } catch (err) {
          next(err);
        }
      }
    } else {
      res.status(400).send({ message: 'invalid verification token given' });
    }
  }

  getResendVerification(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id) {
      const id: number = Number.parseInt(req.params.id);
      prisma.eventOrganizer
        .findUnique({
          where: { id: id },
        })
        .then((eo) => {
          if (eo) {
            if (!eo.emailVerified) {
              sendVerificationEmail(req, eo);
              res.status(200).send();
            } else {
              res.status(404).send({ message: 'user email already verified' });
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

  getProfilePicture(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);
      prisma.eventOrganizer
        .findUnique({
          where: {
            id: id
          },
          select: {
            profilPicture: true
          }
        })
        .then((eo) => {
          if (eo) {
            if (eo.profilPicture) {
              res
                .status(200)
                .contentType('image/png')
                .send(eo.profilPicture);
            } else {
              Jimp.read(
                path.join(
                  __dirname,
                  '../../../../public/defaultProfilePicture.png'
                )
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

  getNotification(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id) {
      const id: number = Number.parseInt(req.params.id);
      prisma.eventOrganizer
        .findUnique({
          where: { id: id },
          include: { notifications: true },
        })
        .then((eo) => {
          if (eo) {
            res.status(200).send({ notifications: eo.notifications });
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(404).send({ message: 'invalid id given' });
    }
  }

  putTerminate(req: Request, res: Response, next: NextFunction): void {
    const user = req.user as JwtDataStore;
    const adminScope = user.scopes.find((scope, _i, _obj) => {
      return scope.role == Roles.Admin;
    });
    if (adminScope && adminScope.id != undefined) {
      prisma.admin
        .findUnique({ where: { id: adminScope.id } })
        .then((admin) => {
          if (
            req.params.id != undefined &&
            req.body.policyBreach &&
            req.body.description &&
            admin
          ) {
            const id: number = Number.parseInt(req.params.id);
            prisma.eventOrganizer
              .findUnique({ where: { id: id } })
              .then((eo) => {
                if (eo) {
                  prisma.termination
                    .create({
                      data: {
                        description: req.body.description,
                        policyBreach: req.body.policyBreach,
                        admin: {
                          connect: { id: admin.id },
                        },
                        eventOrganizer: {
                          connect: { id: eo.id },
                        },
                      },
                    })
                    .then((termination) => {
                      if (termination) {
                        prisma.eventOrganizer
                          .update({
                            where: { id: eo.id },
                            data: {
                              status: 'TERMINATED',
                            },
                          })
                          .then((_) =>
                            res.status(200).send({
                              policyBreach: termination.policyBreach,
                              description: termination.description,
                              adminId: termination.adminId,
                            })
                          );
                      }
                    })
                    .catch((err) => next(err));
                } else {
                  res.status(404).send({ message: 'invalid id given' });
                }
              })
              .catch((err) => next(err));
          }
        });
    }
  }

  deleteTerminate(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id: number = Number.parseInt(req.params.id);
      prisma.eventOrganizer
        .findUnique({ where: { id: id }, include: { termination: true } })
        .then((eo) => {
          if (eo && eo.termination) {
            prisma.termination
              .delete({
                where: { id: eo.termination.id },
              })
              .then((_termination) => {
                prisma.user
                  .update({
                    where: { id: eo.id },
                    data: { status: 'ACTIVE' },
                  })
                  .then((_) =>
                    res
                      .status(200)
                      .send({ message: 'user removed from termination list' })
                  );
              })
              .catch((err) => {
                next(err);
              });
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        });
    } else {
      res.status(404).send({ message: 'invalid id given' });
    }
  }

  putSuspension(req: Request, res: Response, next: NextFunction): void {
    const user = req.user as JwtDataStore;
    const adminScope = user.scopes.find((scope, _i, _obj) => {
      return scope.role == Roles.Admin;
    });
    if (
      adminScope &&
      adminScope.id != undefined &&
      req.params.id != undefined &&
      req.body.length &&
      req.body.policyBreach &&
      req.body.description
    ) {
      const id: number = Number.parseInt(req.params.id);
      prisma.eventOrganizer.findUnique({ where: { id: id } }).then((eo) => {
        if (eo) {
          prisma.admin
            .findUnique({ where: { id: adminScope.id } })
            .then((admin) => {
              if (admin) {
                prisma.suspension
                  .create({
                    data: {
                      policyBreach: req.body.policyBreach,
                      description: req.body.description,
                      endDate: new Date(
                        Date.now() + strToMilis(req.body.length)
                      ),
                      admin: {
                        connect: { id: admin.id },
                      },
                      eventOrganizer: {
                        connect: { id: eo.id },
                      },
                    },
                  })
                  .then((suspension) => {
                    prisma.user
                      .update({
                        where: { id: eo.id },
                        data: { status: 'SUSPENDED' },
                      })
                      .then((_) =>
                        res.status(200).send({
                          length: req.body.length,
                          policyBreach: suspension.policyBreach,
                          description: suspension.description,
                          adminId: suspension.adminId,
                        })
                      );
                  });
              } else {
                res.status(404).send({ message: 'invalid id given' });
              }
            })
            .catch((err) => {
              next(err);
            });
        } else {
          res.status(404).send({ message: 'invalid id given' });
        }
      });
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  postWarn(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id && req.body.description && req.body.policyBreach) {
      const id: number = Number.parseInt(req.params.id);
      prisma.eventOrganizer
        .findUnique({ where: { id: id } })
        .then((eo) => {
          if (eo) {
            prisma.notification
              .create({
                data: {
                  title: 'Policy breach waring: ' + req.body.policyBreach,
                  content: req.body.description,
                  eventOrganizer: {
                    connect: { id: eo.id },
                  },
                },
              })
              .catch((err) => next(err));
          } else {
            res.send(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.send(404).send({ message: 'invalid id given' });
    }
  }
}
export default new Controller();
