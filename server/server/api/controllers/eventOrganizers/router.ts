import express from 'express';
import controller from './controller';
import checkPermissions from '../../middlewares/permissions.handler';
import { Roles } from '../../interfaces/roles.enum';

export default express
  .Router()
  .post('/', checkPermissions([{ role: Roles.User }]), controller.register)
  .get('/', controller.all)
  .get('/:id', controller.byId)
  .put('/:id', controller.update)
  .get('/:id/events', controller.getEvents)
  .put('/verify/:id', controller.verify)
  .delete('/verify/:id', controller.unverify);
