import express, { NextFunction, Request, Response } from 'express';
import controller from './controller';
import checkPermissions from '../../middlewares/permissions.handler';
import { Roles } from '../../interfaces/roles.enum';

export default express
  .Router()
  .post(
    '/',
    (req: Request, _res: Response, next: NextFunction) => {
      if (
        (req.ip == '127.0.0.1' || req.ip == '::1') &&
        process.env.ALLOW_ADMIN_REGISTRATION == 'true'
      ) {
        next();
      } else {
        next({ status: 403, message: 'Restricted Endpoint' });
      }
    },
    controller.postRegister
  )
  .get(
    '/:id',
    checkPermissions([
      {
        role: Roles.Admin,
      },
    ]),
    controller.getById
  )
  .get(
    '/:id/refresh-tokens',
    checkPermissions([{ role: Roles.Admin }]),
    controller.getRefreshTokens
  )
  .post('/authenticate', controller.postLogin)
  .post('/refresh-token', controller.postRefreshToken)
  .post(
    '/revoke-token',
    checkPermissions([{ role: Roles.Admin }]),
    controller.postRevokeToken
  );
