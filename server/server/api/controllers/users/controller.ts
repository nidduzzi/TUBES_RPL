import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PrismaClient, RefreshToken, User } from '@prisma/client';
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
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    if (username && email && password) {
      let user = await prisma.user.findFirst({
        where: { OR: [{ email: email }, { username: username }] },
      });
      if (user == undefined) {
        user = await prisma.user.create({
          data: {
            username: username,
            email: email,
            passwordHash: bcrypt.hashSync(password, 10),
            status: 'ACTIVE',
          },
        });
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          emailVerified: user.emailVerified,
          registrationDate: user.registrationDate,
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

  async login(req: Request, res: Response): Promise<void> {
    const username = req.body.username ?? '';
    const password = req.body.password;
    const email = req.body.email ?? '';
    if (!password) {
      res.status(400).send({ message: 'no password' });
    } else if (!username && !email) {
      res.status(400).send({ message: 'no email or username' });
    } else {
      // get user entity
      let user;
      if (username) {
        user = await prisma.user.findFirst({
          where: { username: username },
        });
      } else {
        user = await prisma.user.findFirst({ where: { email: email } });
      }
      if (user) {
        // validate user password
        if (bcrypt.compareSync(password, user.passwordHash)) {
          // create access tokens

          const refreshToken = await prisma.refreshToken.create({
            data: generateRefreshToken(user, req.ip),
          });

          const body = {
            id: user.id,
            username: user.username,
            jwtToken: generateJwtToken(user),
          };
          res.cookie('refreshToken', refreshToken.token, {
            expires: refreshToken.expires,
          });
          res.status(200).json(body);
        } else {
          res
            .status(400)
            .json({ message: 'invalid username/email or password' });
        }
      } else {
        res.status(400).json({ message: 'invalid username/email or password' });
      }
    }
  }
}
export default new Controller();
