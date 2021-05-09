import express from 'express';
import controller from './controller';
import checkPermissions from '../../middlewares/permissions.handler';

export default express
  .Router()
  .post('/', controller.register)
  .get('/', checkPermissions([{ role: 'admin' }]), controller.all)
  .get(
    '/:id',
    checkPermissions([
      {
        role: 'user',
        idValidator: (id: number, userId: number): boolean => {
          return id == userId;
        },
      },
    ]),
    controller.byId
  )
  .post('/authenticate', controller.login);
