import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PrismaClient, User } from '@prisma/client';
import { generatedRefreshToken } from '../../interfaces/generatedRefreshToken.interface';
import { Authentificated } from '../../interfaces/authentificated.interface';
import { Roles } from '../../interfaces/roles.enum';
import { Scope } from '../../interfaces/authentification.interface';
import { ENCRYPT_ROUNDS } from '../../../config.json';
import Jimp from 'jimp';
import path from 'path';
import JwtDataStore from '../../interfaces/jwtDataStore.interface';
import emailService from '../../services/email.service';
import { strToMilis } from '../../services/strToMilis.service';
const prisma = new PrismaClient();

function generateJwtToken(scopes: Array<Scope>): string {
  return jwt.sign(
    { scopes: scopes },
    process.env.SESSION_SECRET ?? 'MySecret',
    {
      expiresIn: '10m',
      algorithm: 'HS256',
    }
  );
}
function generateEmailVerificationToken(user: User): string {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.SESSION_SECRET ?? 'MySecret',
    {
      expiresIn: '1d',
      algorithm: 'HS256',
    }
  );
}

function sendVerificationEmail(req: Request, user: User) {
  const token = generateEmailVerificationToken(user);
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
  emailService(user.email, 'Ticketin Email Verification', emailHtml);
}

function generateRefreshToken(
  user: User,
  ipAddress: string
): generatedRefreshToken {
  const refreshToken: generatedRefreshToken = {
    adminId: null,
    userId: user.id,
    createdByIp: ipAddress,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    token: randomBytes(64).toString('hex'),
  };

  return refreshToken;
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
            ? prisma.user.findMany({
                where: q,
                select: h.select ?? undefined,
                cursor: h.cursor ?? undefined,
                skip: h.skip ?? h.cursor ? 1 : undefined,
                distinct: h.distinct ?? undefined,
                orderBy: h.orderBy ?? undefined,
                take: h.take ?? undefined,
              })
            : // or if h.include is sent instead
              prisma.user.findMany({
                where: q,
                include: h.include ?? undefined,
                cursor: h.cursor ?? undefined,
                skip: h.skip ?? h.cursor ? 1 : undefined,
                distinct: h.distinct ?? undefined,
                orderBy: h.orderBy ?? undefined,
                take: h.take ?? undefined,
              })
          : // or if h is not sent
            prisma.user.findMany({
              where: q,
            })
        : // or if q isn't sent and then check if h is sent
        h
        ? // check if h.select is sent
          h.select
          ? prisma.user.findMany({
              select: h.select ?? undefined,
              cursor: h.cursor ?? undefined,
              skip: h.skip ?? h.cursor ? 1 : undefined,
              distinct: h.distinct ?? undefined,
              orderBy: h.orderBy ?? undefined,
              take: h.take ?? undefined,
            })
          : // or if h.include is sent instead
            prisma.user.findMany({
              include: h.include ?? undefined,
              cursor: h.cursor ?? undefined,
              skip: h.skip ?? h.cursor ? 1 : undefined,
              distinct: h.distinct ?? undefined,
              orderBy: h.orderBy ?? undefined,
              take: h.take ?? undefined,
            })
        : // or if h is not sent
          prisma.user.findMany({});

    query
      .then((users) => {
        // send response
        res.status(200).send({ users: users });
      })
      .catch((err) => next(err));
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);
      prisma.user
        .findUnique({
          where: { id: id },
        })
        .then((user) => {
          if (user) {
            const body = {
              id: id,
              username: user.username,
              email: user.email,
              emailVerified: user.emailVerified,
              registrationDate: user.registrationDate,
              profilePicture: user.profilePicture,
            };
            res.status(200).send({ user: body });
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
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    if (username && email && password) {
      prisma.user
        .findFirst({
          where: { OR: [{ email: email }, { username: username }] },
        })
        .then((user) => {
          if (user) {
            res.status(409).send({ message: 'username or email exists' });
          } else {
            prisma.user
              .create({
                data: {
                  username: username,
                  email: email,
                  passwordHash: bcrypt.hashSync(password, ENCRYPT_ROUNDS),
                  status: 'ACTIVE',
                },
              })
              .then((u) => {
                sendVerificationEmail(req, u);
                res.status(201).send({
                  id: u.id,
                  username: u.username,
                  email: u.email,
                  emailVerified: u.emailVerified,
                  registrationDate: u.registrationDate,
                });
              })
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    } else {
      res
        .status(400)
        .send({ message: 'invalid username or email or password' });
    }
  }

  async postLogin(req: Request, res: Response): Promise<void> {
    const username = req.body.username ?? '';
    const password = req.body.password;
    const email = req.body.email ?? '';
    if (!password) {
      res.status(400).send({ message: 'no password' });
    } else if (!username && !email) {
      res.status(400).send({ message: 'no email or username' });
    } else {
      // get user entity
      let user;
      if (username) {
        user = await prisma.user.findUnique({
          where: { username: username },
          include: {
            suspensions: true,
            termination: true,
            eventOrganizer: {
              include: { suspensions: true, termination: true },
            },
          },
        });
      } else {
        user = await prisma.user.findUnique({
          where: { email: email },
          include: {
            suspensions: true,
            termination: true,
            eventOrganizer: {
              include: { suspensions: true, termination: true },
            },
          },
        });
      }
      if (user) {
        // check if user is suspended or terminated
        if (user.termination) {
          res.status(403).send({ message: 'user account terminated' });
        } else if (
          user.suspensions.some((suspension) => suspension.endDate > new Date())
        ) {
          res.status(403).send({
            message:
              'user account suspended until ' +
              user.suspensions
                .find((suspension) => suspension.endDate > new Date())
                ?.endDate.toDateString(),
          });
        } else {
          // validate user password
          if (bcrypt.compareSync(password, user.passwordHash)) {
            // create access tokens
            const refreshToken = await prisma.refreshToken.create({
              data: generateRefreshToken(user, req.ip),
            });
            const scopes: Array<Scope> = [{ id: user.id, role: Roles.User }];
            if (user.eventOrganizer) {
              if (
                !(
                  user.eventOrganizer?.termination ||
                  user.eventOrganizer.suspensions.some(
                    (suspension) => suspension.endDate > new Date()
                  )
                )
              ) {
                scopes.push({
                  id: user.eventOrganizer.id,
                  role: Roles.EventOrganizer,
                });
              }
            }
            const body = {
              auth: scopes,
              jwtToken: generateJwtToken(scopes),
            };
            res.cookie('refreshToken', refreshToken.token, {
              expires: refreshToken.expires,
            });
            res.status(200).send(body);
          } else {
            res
              .status(400)
              .send({ message: 'invalid username/email or password' });
          }
        }
      } else {
        res.status(400).send({ message: 'invalid username/email or password' });
      }
    }
  }

  getResendVerification(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id) {
      const id: number = Number.parseInt(req.params.id);
      prisma.user
        .findUnique({
          where: { id: id },
        })
        .then((user) => {
          if (user) {
            if (!user.emailVerified) {
              sendVerificationEmail(req, user);
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
                prisma.user
                  .findUnique({
                    where: {
                      id:
                        typeof payload.id == 'number'
                          ? payload.id
                          : Number.parseInt(payload.id),
                    },
                  })
                  .then((user) => {
                    if (user) {
                      if (!user.emailVerified && user.email == payload.email) {
                        prisma.user
                          .update({
                            where: { id: user.id },
                            data: { emailVerified: true },
                          })
                          .then((_user) => {
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

  async postRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token: string | undefined =
      req.body.refreshToken ?? req.cookies.refreshToken;
    // check if a token is sent
    if (token) {
      const refreshToken = await prisma.refreshToken.findUnique({
        where: { token: token },
        include: {
          user: {
            include: {
              termination: true,
              suspensions: true,
              eventOrganizer: {
                include: { termination: true, suspensions: true },
              },
            },
          },
        },
      });
      const user = refreshToken?.user;
      // check if token is a valid refresh token
      if (refreshToken && user) {
        // check if refresh token is broken ie. doesn't belong to a user
        if (!user) {
          res.status(500).send({ message: 'database error' });
        } else if (user.termination) {
          prisma.refreshToken
            .update({
              where: { id: refreshToken.id },
              data: { revoked: new Date(), revokedByIp: req.ip },
            })
            .then((_) =>
              res
                .status(403)
                .clearCookie('refreshToken')
                .send({ message: 'user terminated' })
            )
            .catch((err) => next(err));
        } else if (
          user.suspensions.some(
            (suspension) => suspension.endDate > new Date()
          ) &&
          user.suspensions
        ) {
          prisma.refreshToken
            .update({
              where: { id: refreshToken.id },
              data: { revoked: new Date(), revokedByIp: req.ip },
            })
            .then((_) =>
              res
                .status(403)
                .clearCookie('refreshToken')
                .send({
                  message:
                    'user suspended until ' +
                    user.suspensions
                      .find((suspension) => suspension.endDate > new Date())
                      ?.endDate.toISOString(),
                })
            )
            .catch((err) => next(err));
        }
        // check if refresh token is still valid ie. not expired or revoked
        else if (
          refreshToken.expires >= new Date() &&
          refreshToken.revoked == undefined
        ) {
          try {
            // create a new refresh token for the user
            const newRefreshToken = await prisma.refreshToken.create({
              data: generateRefreshToken(user, req.ip),
            });

            // revoke and update the old refresh token
            await prisma.refreshToken.update({
              where: { id: refreshToken.id },
              data: {
                revoked: new Date(),
                revokedByIp: req.ip,
                replacedByToken: newRefreshToken.token,
              },
            });

            // construct response body
            const scopes: Array<Scope> = [{ id: user.id, role: Roles.User }];
            if (user.eventOrganizer) {
              if (
                !(
                  user.eventOrganizer?.termination ||
                  user.eventOrganizer.suspensions.some(
                    (suspension) => suspension.endDate > new Date()
                  )
                )
              ) {
                scopes.push({
                  id: user.eventOrganizer.id,
                  role: Roles.EventOrganizer,
                });
              }
            }

            // include a newly generated jwtToken
            const body: Authentificated = {
              auth: scopes,
              jwtToken: generateJwtToken(scopes),
            };

            // send success response
            res
              .status(200)
              .cookie('refreshToken', newRefreshToken.token, {
                expires: newRefreshToken.expires,
              })
              .send(body);
          } catch (error) {
            next(error);
          }
        }
        // check if token is expired
        else if (refreshToken.expires < new Date()) {
          // revoke expired token
          await prisma.refreshToken
            .update({
              where: { id: refreshToken.id },
              data: {
                revoked: new Date(),
                revokedByIp: req.ip,
              },
            })
            .then((_) =>
              res.status(404).send({ message: 'refesh token is expired' })
            )
            .catch((err) => next(err));
        }
      } else {
        res.status(400).send({
          message: 'The refresh token is invalid, revoked or expired',
        });
      }
    } else {
      // send invalid or expired token message if the function hasn't returned
      res.status(400).send({ message: 'The refresh token is invalid' });
    }
  }

  postRevokeToken(req: Request, res: Response, next: NextFunction): void {
    const token: string | undefined =
      req.cookies.refreshToken ?? req.params['token'];
    // check if a token is sent with request
    const user = req.user as JwtDataStore;
    const scope = user.scopes.find((scope, _i, _obj) => {
      return scope.role == Roles.Admin || scope.role == Roles.User;
    });
    if (token && scope) {
      prisma.refreshToken
        .findUnique({
          where: { token: token },
        })
        .then((refreshToken) => {
          // check if requesting user has role privalages
          const allowed =
            scope.role == Roles.Admin
              ? true
              : refreshToken?.userId === scope.id;
          // check if token is a valid refresh token
          if (refreshToken && refreshToken.revoked == undefined && allowed) {
            // revoke refresh token
            prisma.refreshToken
              .update({
                where: { id: refreshToken.id },
                data: { revoked: new Date(), revokedByIp: req.ip },
              })
              // send response
              .then((_) =>
                res
                  .status(200)
                  .clearCookie('refreshToken')
                  .send({ message: 'refresh token revoked' })
              );
          } else if (!allowed) {
            res
              .status(403)
              .send({ message: 'insufficient scope to revoke token' });
          } else {
            res.status(400).send({ message: 'invalid refresh token given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res
        .status(400)
        .send({ message: 'invalid refresh token or jwt token given' });
    }
  }

  getReservations(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);
      prisma.reservation
        .findMany({
          where: { userId: id },
          include: { tickets: true },
        })
        .then((rsv) => {
          if (rsv) {
            res.status(200).send({ reservations: rsv });
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
      prisma.user
        .findUnique({ where: { id: id }, select: { profilePicture: true } })
        .then((user) => {
          if (user) {
            if (user.profilePicture) {
              res
                .status(200)
                .contentType('image/png')
                .send(user.profilePicture);
            } else {
              Jimp.read(
                path.join(
                  __dirname,
                  '../../../../public/defaultProfilePicture.png'
                )
              ).then((def) => {
                def.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
                  if (err) {
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

  putProfilePicture(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined && req.body) {
      const id = Number.parseInt(req.params.id);
      prisma.user
        .findUnique({ where: { id: id } })
        .then((user) => {
          if (user) {
            // update profile picture
            if (req.file != undefined && req.file.buffer != undefined) {
              // convert image to jpeg
              Jimp.read(req.file.buffer)
                .then((img) => {
                  img.cover(
                    256,
                    256,
                    Jimp.VERTICAL_ALIGN_MIDDLE | Jimp.HORIZONTAL_ALIGN_CENTER
                  );
                  img.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
                    if (err) {
                      next(err);
                    } else {
                      prisma.user
                        .update({
                          where: { id: user.id },
                          data: {
                            profilePicture: buffer,
                          },
                        })
                        .then((_) =>
                          res.status(200).send({
                            message: 'profile picture updated',
                          })
                        )
                        .catch((error) => next(error));
                    }
                  });
                })
                .catch((error) => next(error));
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

  deleteProfilePicture(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id) {
      const id = Number.parseInt(req.params.id);
      prisma.user
        .findUnique({ where: { id: id } })
        .then((user) => {
          if (user) {
            // delete profile picture
            prisma.user
              .update({
                where: { id: user.id },
                data: { profilePicture: null },
              })
              .then((_) => {
                res.status(200).send({ message: 'profile picture deleted' });
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

  async putUpdateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if (req.params.id != undefined && req.body) {
      const id = Number.parseInt(req.params.id);
      let body = req.body;

      if (typeof body == 'string') {
        body = JSON.parse(body);
      }
      try {
        const user = await prisma.user.findUnique({ where: { id: id } });
        if (user) {
          // update email
          if (body.email) {
            const email = await prisma.user.findUnique({
              where: { email: body.email },
            });
            if (email && email.id != user.id) {
              res.status(409).send({ message: 'email already taken' });
              return;
            }
            await prisma.user.update({
              where: { id: user.id },
              data: { email: body.email },
            });
          }
          // update username
          if (body.username) {
            const username = await prisma.user.findUnique({
              where: { username: body.username },
            });
            if (username && username.id != user.id) {
              res.status(409).send({ message: 'username already taken' });
              return;
            }
            await prisma.user.update({
              where: { id: user.id },
              data: { username: body.username },
            });
          }
          // update password
          if (body.password) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                passwordHash: bcrypt.hashSync(body.password, ENCRYPT_ROUNDS),
              },
            });
          }
          // update address
          if (body.address) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                address: body.address,
              },
            });
          }

          // update dateOfBirth
          if (body.address) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                dateOfBirth: new Date(body.dateOfBirth),
              },
            });
          }
          // respond with updated user
          await prisma.user
            .findUnique({ where: { id: user.id } })
            .then((updatedUser) => {
              if (updatedUser) {
                res.status(200).send({
                  user: {
                    id: updatedUser.id,
                    username: updatedUser.username,
                    email: updatedUser.email,
                    emailVerified: updatedUser.emailVerified,
                    registrationDate: updatedUser.registrationDate.toISOString(),
                    dateOfBirth: updatedUser.dateOfBirth,
                    address: updatedUser.address,
                  },
                });
              }
            });
        }
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  getUserRefreshTokens(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id: number = Number.parseInt(req.params.id);
      prisma.user
        .findUnique({ where: { id: id }, include: { refreshTokens: true } })
        .then((user) => {
          if (user) {
            res.status(200).send({ refreshTokens: user.refreshTokens });
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((error) => next(error));
    } else {
      res.status(400).send({ message: 'invalid id given' });
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
            prisma.user
              .findUnique({ where: { id: id } })
              .then((user) => {
                if (user) {
                  prisma.termination
                    .create({
                      data: {
                        description: req.body.description,
                        policyBreach: req.body.policyBreach,
                        admin: {
                          connect: { id: admin.id },
                        },
                        user: {
                          connect: { id: user.id },
                        },
                      },
                    })
                    .then((termination) => {
                      if (termination) {
                        prisma.user
                          .update({
                            where: { id: user.id },
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
                          )
                          .catch((err) => next(err));
                      } else {
                        res.status(500).send({ message: 'database error' });
                      }
                    })
                    .catch((err) => next(err));
                } else {
                  res.status(404).send({ message: 'invalid id given' });
                }
              })
              .catch((err) => next(err));
          } else {
            res.status(400).send({ message: 'invalid request body' });
          }
        });
    } else {
      res.status(400).send({ message: 'invalid authorization' });
    }
  }

  deleteTerminate(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id: number = Number.parseInt(req.params.id);
      prisma.user
        .findUnique({ where: { id: id }, include: { termination: true } })
        .then((user) => {
          if (user && user.termination) {
            prisma.termination
              .delete({
                where: { id: user.termination.id },
              })
              .then((_termination) => {
                prisma.user
                  .update({
                    where: { id: user.id },
                    data: { status: 'ACTIVE' },
                  })
                  .then((_) =>
                    res
                      .status(200)
                      .send({ message: 'user removed from termination list' })
                  )
                  .catch((err) => next(err));
              })
              .catch((err) => next(err));
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
      prisma.user.findUnique({ where: { id: id } }).then((user) => {
        if (user) {
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
                      user: {
                        connect: { id: user.id },
                      },
                    },
                  })
                  .then((suspension) => {
                    prisma.user
                      .update({
                        where: { id: user.id },
                        data: { status: 'SUSPENDED' },
                      })
                      .then((_) =>
                        res.status(200).send({
                          length: req.body.length,
                          policyBreach: suspension.policyBreach,
                          description: suspension.description,
                          adminId: suspension.adminId,
                        })
                      )
                      .catch((err) => next(err));
                  });
              } else {
                res.status(404).send({ message: 'invalid id given' });
              }
            })
            .catch((err) => next(err));
        } else {
          res.status(404).send({ message: 'invalid id given' });
        }
      });
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  deleteSuspension(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id) {
      const id: number = Number.parseInt(req.params.id);
      prisma.user
        .findUnique({
          where: { id: id },
          include: {
            suspensions: { where: { userId: id }, orderBy: { id: 'desc' } },
          },
        })
        .then((user) => {
          if (user && user.suspensions[0]) {
            prisma.suspension
              .delete({
                where: { id: user.suspensions[0].id },
              })
              .then((_suspension) => {
                prisma.user
                  .update({
                    where: { id: user.id },
                    data: { status: 'ACTIVE' },
                  })
                  .then((_) =>
                    res
                      .status(200)
                      .send({ message: 'user removed from suspension list' })
                  )
                  .catch((err) => next(err));
              })
              .catch((err) => next(err));
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        });
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }

  getNotifications(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id) {
      const id: number = Number.parseInt(req.params.id);
      prisma.user
        .findUnique({
          where: { id: id },
          include: { notifications: true },
        })
        .then((user) => {
          if (user) {
            res.status(200).send({ notifications: user.notifications });
          } else {
            res.status(404).send({ message: 'invalid id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(404).send({ message: 'invalid id given' });
    }
  }

  postWarn(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id && req.body.description && req.body.policyBreach) {
      const id: number = Number.parseInt(req.params.id);
      prisma.user
        .findUnique({ where: { id: id } })
        .then((user) => {
          if (user) {
            prisma.notification
              .create({
                data: {
                  title: 'Policy breach waring: ' + req.body.policyBreach,
                  content: req.body.description,
                  user: {
                    connect: { id: user.id },
                  },
                },
              })
              .then((_) => res.status(200).send({ message: 'warning created' }))
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
}
export default new Controller();
