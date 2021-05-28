import express from 'express';
import controller from './controller';
import checkPermissions from '../../middlewares/permissions.handler';
import { Roles } from '../../interfaces/roles.enum';

export default express
  .Router()
  .get('/', controller.getAll)
  .post(
    '/',
    checkPermissions([{ role: Roles.EventOrganizer }, { role: Roles.Admin }]),
    controller.postCreate
  )
  .get('/:id', controller.getById)
  .get('/:id/events', controller.getByIdEvents);
