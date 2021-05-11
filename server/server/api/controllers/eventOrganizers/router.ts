import express from 'express';
import controller from './controller';
import checkPermissions from '../../middlewares/permissions.handler';

export default express
  .Router()
  .post('/',
    checkPermissions([
      {
        role: 'user',
        idValidator: (id: number, userId: number): boolean => {
          return id == userId;
        },
      },
    ]), controller.register)
  .get('/', checkPermissions([{ role: 'admin' }]), controller.all);
