import express from 'express';
import controller from './controller';
import checkPermissions from '../../middlewares/permissions.handler';
import { Roles } from '../../interfaces/roles.enum';
import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

export default express
  .Router()
  .get('/', checkPermissions([{ role: Roles.Admin }]), controller.getAll)
  .post('/', checkPermissions([{ role: Roles.User }]), controller.postCreate)
  .get(
    '/:id',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const reservation = await prisma.reservation.findFirst({
            where: { id: id, userId: roleId },
          });
          return reservation ? true : false;
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
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const reservation = await prisma.reservation.findFirst({
            where: { id: id, userId: roleId },
          });
          return reservation ? true : false;
        },
      },
    ]),
    controller.putUpdate
  )
  .put(
    '/cancel/:id',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const reservation = await prisma.reservation.findFirst({
            where: { id: id, userId: roleId },
          });
          return reservation ? true : false;
        },
      },
    ]),
    controller.putCancel
  )
  .delete(
    '/cancel/:id',
    checkPermissions([
      {
        role: Roles.Admin,
      },
    ]),
    controller.deleteCancel
  );
