import express from 'express';
import controller from './controller';
import checkPermissions from '../../middlewares/permissions.handler';
import { Roles } from '../../interfaces/roles.enum';
import multer from 'multer';
import { PrismaClient } from '.prisma/client';

const upload = multer({ storage: multer.memoryStorage() });
const prisma = new PrismaClient();

export default express
  .Router()
  .get(
    '/',
    checkPermissions([], { credentialsRequired: false }),
    controller.getAll
  )
  .post(
    '/',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const event = await prisma.event.findUnique({
            where: { id: id },
            include: { eventOrganizer: true },
          });
          if (event) {
            return (
              event.eventOrganizerId == roleId && event.eventOrganizer.verified
            );
          } else return false;
        },
      },
    ]),
    controller.postNewEvent
  )
  .get('/:id', controller.getById)
  .put(
    '/:id',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const event = await prisma.event.findUnique({
            where: { id: id },
            include: { eventOrganizer: true },
          });
          if (event) {
            return (
              event.eventOrganizerId == roleId && event.eventOrganizer.verified
            );
          } else return false;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    upload.none(),
    controller.putUpdateEvent
  )
  .get('/:id/logo', controller.getLogo)
  .put(
    '/:id/logo',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const event = await prisma.event.findUnique({
            where: { id: id },
            include: { eventOrganizer: true },
          });
          if (event) {
            return (
              event.eventOrganizerId == roleId && event.eventOrganizer.verified
            );
          } else return false;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    upload.single('logo'),
    controller.putLogo
  )
  .delete(
    '/:id/logo',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const event = await prisma.event.findUnique({
            where: { id: id },
            include: { eventOrganizer: true },
          });
          if (event) {
            return (
              event.eventOrganizerId == roleId && event.eventOrganizer.verified
            );
          } else return false;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.deleteLogo
  )
  .post(
    '/:id/image',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const event = await prisma.event.findUnique({
            where: { id: id },
            include: { eventOrganizer: true },
          });
          if (event) {
            return (
              event.eventOrganizerId == roleId && event.eventOrganizer.verified
            );
          } else return false;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    upload.array('images'),
    controller.postImage
  )
  .get('/:id/image/:imageNumber', controller.getImage)
  .put(
    '/:id/image/:imageNumber',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const event = await prisma.event.findUnique({
            where: { id: id },
            include: { eventOrganizer: true },
          });
          if (event) {
            return (
              event.eventOrganizerId == roleId && event.eventOrganizer.verified
            );
          } else return false;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    upload.single('image'),
    controller.putImage
  )
  .delete(
    '/:id/image/:imageNumber',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const event = await prisma.event.findUnique({
            where: { id: id },
            include: { eventOrganizer: true },
          });
          if (event) {
            return (
              event.eventOrganizerId == roleId && event.eventOrganizer.verified
            );
          } else return false;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.deleteImage
  )
  .get(
    '/:id/reservations',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const event = await prisma.event.findUnique({
            where: { id: id },
            include: { eventOrganizer: true },
          });
          if (event) {
            return (
              event.eventOrganizerId == roleId && event.eventOrganizer.verified
            );
          } else return false;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.getReservations
  )
  .get(
    '/:id/verify-ticket/:uuidToken',
    checkPermissions([
      {
        role: Roles.EventOrganizer,
        idValidator: async (id: number, roleId: number): Promise<boolean> => {
          const event = await prisma.event.findUnique({
            where: { id: id },
            include: { eventOrganizer: true },
          });
          if (event) {
            return (
              event.eventOrganizerId == roleId && event.eventOrganizer.verified
            );
          } else return false;
        },
      },
      {
        role: Roles.Admin,
      },
    ]),
    controller.getVerifyTicket
  );
