import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { EventOrganizer, Prisma, PrismaClient, User } from '@prisma/client';
import JwtDataStore from '../../interfaces/jwtDataStore.interface';
import emailService from '../../services/email.service';
import { Roles } from '../../interfaces/roles.enum';
import Jimp from 'jimp';
import path from 'path';
import { strToMilis } from '../../services/strToMilis.service';

const prisma = new PrismaClient();

export class Controller {
  postCreate(req: Request, res: Response, next: NextFunction): void {
    if (req.body.eventId && req.body.ticketsTypes) {
      const eventId: number = req.body.eventId;
      const ticketsTypes = req.body.ticketsTypes;
      prisma.event
        .findUnique({
          where: {
            id: eventId
          }
        })
        .then((evt) => {
          if (evt) {
            const user = req.user as JwtDataStore;
            const userScope = user.scopes.find((scope, _i, _obj) => {
              return scope.role == Roles.User;
            });

            // prisma.reservation
            // .create({

            // })
            
          } else {
            res.status(404).send({ message: 'invalid event id given' });
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(400).send({ message: 'invalid request' });
    }
  }
}
export default new Controller();
