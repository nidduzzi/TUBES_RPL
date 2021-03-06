import express from 'express';
import controller from './controller';
import checkPermissions from '../../middlewares/permissions.handler';
import { Roles } from '../../interfaces/roles.enum';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export default express
  .Router()
  .get('/', checkPermissions([{ role: Roles.Admin }]), controller.getAll)
  .post('/', controller.postRegister)
  .get(
    '/:id',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.getById
  )
  .put(
    '/:id',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    upload.none(),
    controller.putUpdateUser
  )
  .get(
    '/:id/profilePicture',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.getProfilePicture
  )
  .put(
    '/:id/profilePicture',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    upload.single('profilePicture'),
    controller.putProfilePicture
  )
  .delete(
    '/:id/profilePicture',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.deleteProfilePicture
  )
  .get(
    '/:id/notifications',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.getNotifications
  )
  .get(
    '/:id/resend-verification',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.getResendVerification
  )
  .get(
    '/:id/refresh-tokens',
    checkPermissions([{ role: Roles.Admin }]),
    controller.getUserRefreshTokens
  )
  .get(
    '/:id/reservations',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.getReservations
  )
  .get(
    '/:id/reservations/waiting',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.getWaitingReservations
  )
  .put(
    '/terminate/:id',
    checkPermissions([{ role: Roles.Admin }]),
    controller.putTerminate
  )
  .delete(
    '/terminate/:id',
    checkPermissions([{ role: Roles.Admin }]),
    controller.deleteTerminate
  )
  .put(
    '/suspend/:id',
    checkPermissions([{ role: Roles.Admin }]),
    controller.putSuspension
  )
  .delete(
    '/suspend/:id',
    checkPermissions([{ role: Roles.Admin }]),
    controller.deleteSuspension
  )
  .post(
    '/warn/:id',
    checkPermissions([{ role: Roles.Admin }]),
    controller.postWarn
  )
  .post('/authenticate', controller.postLogin)
  .post('/refresh-token', controller.postRefreshToken)
  .post(
    '/revoke-token',
    checkPermissions([{ role: Roles.User }, { role: Roles.Admin }]),
    controller.postRevokeToken
  )
  .get('/verify-email/:token', controller.getVerifyEmail);
