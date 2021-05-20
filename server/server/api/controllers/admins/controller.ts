import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Admin, PrismaClient } from '@prisma/client';
import { generatedRefreshToken } from '../../interfaces/generatedRefreshToken.interface';
import { Authentificated } from '../../interfaces/authentificated.interface';
import { Roles } from '../../interfaces/roles.enum';
import { Scope } from '../../interfaces/authentification.interface';
import { ENCRYPT_ROUNDS } from '../../../config.json';
const prisma = new PrismaClient();

function generateJwtToken(admin: Admin): string {
  const scopes: Array<Scope> = [{ id: admin.id, role: Roles.Admin }];
  return jwt.sign(
    { scopes: scopes },
    process.env.SESSION_SECRET ?? 'MySecret',
    {
      expiresIn: '10m',
      algorithm: 'HS256',
    }
  );
}

function generateRefreshToken(
  admin: Admin,
  ipAddress: string
): generatedRefreshToken {
  const refreshToken: generatedRefreshToken = {
    userId: null,
    adminId: admin.id,
    createdByIp: ipAddress,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    token: randomBytes(64).toString('hex'),
  };

  return refreshToken;
}

export class Controller {
  getById(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id = Number.parseInt(req.params.id);
      prisma.admin
        .findUnique({
          where: { id: id },
        })
        .then((admin) => {
          if (admin) {
            const body = {
              id: admin.id,
              username: admin.username,
            };
            res.status(200).send({ admin: body });
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
    const password: string = req.body.password;
    if (username && password) {
      prisma.admin
        .findUnique({
          where: { username: username },
        })
        .then((admin) => {
          if (admin) {
            res.status(409).send({ message: 'username already exists' });
          } else {
            prisma.admin
              .create({
                data: {
                  username: username,
                  passwordHash: bcrypt.hashSync(password, ENCRYPT_ROUNDS),
                },
              })
              .then((a) => {
                res.status(201).send({
                  id: a.id,
                  username: a.username,
                });
              })
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid username or password' });
    }
  }

  postLogin(req: Request, res: Response, next: NextFunction): void {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      prisma.admin
        .findUnique({ where: { username: username } })
        .then(async (admin) => {
          if (admin) {
            if (bcrypt.compareSync(password, admin.passwordHash)) {
              // validate user password
              // create access tokens
              const refreshToken = await prisma.refreshToken.create({
                data: generateRefreshToken(admin, req.ip),
              });
              const scopes: Array<Scope> = [
                { id: admin.id, role: Roles.Admin },
              ];
              const body = {
                auth: scopes,
                jwtToken: generateJwtToken(admin),
              };
              res.cookie('refreshToken', refreshToken.token, {
                expires: refreshToken.expires,
              });
              res.status(200).json(body);
            } else {
              res.status(400).send({ message: 'wrong username or password' });
            }
          } else {
            res.status(400).send({ message: 'invalid username or password' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'no username or password' });
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
        include: { admin: true },
      });
      // check if token is a valid refresh token
      if (refreshToken) {
        // check if refresh token is broken ie. doesn't belong to a user
        if (
          refreshToken.admin == undefined ||
          refreshToken.adminId == undefined
        ) {
          res.status(500).send({ message: 'database error' });
        }
        // check if refresh token is still valid ie. not expired or revoked
        else if (
          refreshToken.expires >= new Date() &&
          refreshToken.revoked == undefined
        ) {
          try {
            // create a new refresh token for the user
            const newRefreshToken = await prisma.refreshToken.create({
              data: generateRefreshToken(refreshToken.admin, req.ip),
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
            const scopes: Array<Scope> = [
              { id: refreshToken.adminId, role: Roles.Admin },
            ];

            // include a newly generated jwtToken
            const body: Authentificated = {
              auth: scopes,
              jwtToken: generateJwtToken(refreshToken.admin),
            };

            // send success response
            res.cookie('refreshToken', newRefreshToken.token, {
              expires: newRefreshToken.expires,
            });
            res.status(200).send(body);
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
    if (token) {
      prisma.refreshToken
        .findUnique({
          where: { token: token },
        })
        .then((refreshToken) => {
          // check if token is a valid refresh token
          if (refreshToken && refreshToken.revoked == undefined) {
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

  getRefreshTokens(req: Request, res: Response, next: NextFunction): void {
    if (req.params.id != undefined) {
      const id: number = Number.parseInt(req.params.id);
      prisma.admin
        .findUnique({ where: { id: id }, include: { refreshTokens: true } })
        .then((admin) => {
          if (admin) {
            res.status(200).send(admin.refreshTokens);
          }
          res.status(404).send({ message: 'invalid id given' });
        })
        .catch((error) => {
          next(error);
        });
    }
  }
}
export default new Controller();
