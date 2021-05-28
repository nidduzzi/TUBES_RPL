import express from 'express';
import controller from './controller';
import checkPermissions from '../../middlewares/permissions.handler';
import { Roles } from '../../interfaces/roles.enum';
import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

export default express
  .Router()
  .post(
    '/',
    checkPermissions([
      {
        role: Roles.User,
      },
    ]),
    controller.postCreate
  )
  .put(
    ':id',
    checkPermissions([
      {
        role: Roles.PaymentProvider,
      },
    ]),
    controller.putUpdate
  )
  .get(
    ':id',
    checkPermissions([
      {
        role: Roles.User,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const payment = await prisma.payment.findFirst({
            where: { id: id, reservation: { userId: roleId } },
          });
          return payment ? true : false;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.getById
  );
