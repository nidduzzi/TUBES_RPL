import express from 'express';
import controller from './controller';
import checkPermissions from '../../middlewares/permissions.handler';
import { Roles } from '../../interfaces/roles.enum';

export default express
  .Router()
  .post('/',
    checkPermissions([{ role: Roles.User }]),
    controller.postCreate)
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
    controller.getById)
  .put('/:id',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
    ]),
    controller.putUpdate)
  .put('/cancel/:id',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: (id: number, roleId: number): boolean => {
          return id == roleId;
        },
      },
    ]),
    controller.putCancel)
  .delete('/cancel/:id',
    checkPermissions([
      {
        role: Roles.Admin,
      },
    ]),
    controller.deleteCancel);
