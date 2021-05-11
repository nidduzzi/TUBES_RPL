import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { generatedRefreshToken } from '../../interfaces/generatedRefreshToken.interface';
const prisma = new PrismaClient();

function generateJwtToken(user: User): string {
  const scopes = [{ id: user.id, role: 'user' }];
  if (user.eventOrganizerId) {
    scopes.push({ id: user.eventOrganizerId, role: 'EO' });
  }
  return jwt.sign(
    { scopes: scopes },
    process.env.SESSION_SECRET ?? 'MySecret',
    {
      expiresIn: '10m',
    }
  );
}

function generateRefreshToken(
  user: User,
  ipAddress: string
): generatedRefreshToken {
  const refreshToken: generatedRefreshToken = {
    adminId: null,
    userId: user.id,
    createdByIp: ipAddress,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    token: randomBytes(64).toString('hex'),
  };

  return refreshToken;
}

export class Controller {
  all(_: Request, res: Response): void {
    res.status(200);
  }

  byId(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id']);
    res.status(200).json({ id: id });
  }

  async register(req: Request, res: Response): Promise<void> {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const phone: string = req.body.phone;
    const address: string = req.body.address;
    if (name && email && phone && address) {
      let eventOrganizer = await prisma.eventOrganizer.findFirst({
        where: { OR: [{ email: email }, { name: name }] },
      });
      if (eventOrganizer == undefined) {
        let newEventOrganizer: Prisma.EventOrganizerCreateInput;
        newEventOrganizer = {
          name: name,
          email: email,
          phone: phone,
          address: address,
          verified: false
        };
        eventOrganizer = await prisma.eventOrganizer.create({
          data: newEventOrganizer,
        });
        res.status(200).send({
          id: eventOrganizer.id,
          username: eventOrganizer.name,
          email: eventOrganizer.email
        });
      } else {
        res.status(400).send({ message: 'username or email exists' });
      }
    } else {
      res
        .status(400)
        .send({ message: 'invalid username or email or password' });
    }
  }
}
export default new Controller();
