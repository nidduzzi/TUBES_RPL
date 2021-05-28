import express from 'express';
import controller from './controller';
import checkPermissions from '../../middlewares/permissions.handler';
import { Roles } from '../../interfaces/roles.enum';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export default express
  .Router()
  .post('/', checkPermissions([{ role: Roles.User }]), controller.postRegister)
  .get(
    '/',
    checkPermissions([], { credentialsRequired: false }),
    controller.getAll
  )
  .get('/:id', controller.getById)
  .put(
    '/:id',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    upload.none(),
    controller.putUpdateEO
  )
  .get('/:id/events', controller.getEvents)
  .put(
    '/verify/:id',
    checkPermissions([{ role: Roles.Admin }]),
    controller.putVerifyEO
  )
  .delete(
    '/verify/:id',
    checkPermissions([{ role: Roles.Admin }]),
    controller.deleteVerifyEO
  )
  .get('/verify-email/:token', controller.getVerifyEmail)
  .get('/:id/profilePicture', controller.getProfilePicture)
  .put(
    '/:id/profilePicture',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
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
        role: Roles.EventOrganizer,
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
  .get(
    '/:id/notifications',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.getNotification
  )
  .get(
    '/:id/resend-verification',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
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
  .get(
    '/:id/allowed-users',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.getAllowedUsers
  )
  .put(
    '/:id/allowed-users/:uid',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.putAllowedUser
  )
  .delete(
    '/:id/allowed-users/:uid',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.deleteAllowedUser
  );
