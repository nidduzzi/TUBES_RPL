import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Prisma, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class Controller {
  async all(_: Request, res: Response): Promise<void> {
    const eventOrganizers = await prisma.eventOrganizer.findMany({
      include: {
        allowedUsers: true
      }
    });
    res.status(200).send({ eventOrganizers: eventOrganizers });
  }

  async byId(req: Request, res: Response): Promise<void> {
    const id = Number.parseInt(req.params['id']);
    const eventOrganizer = await prisma.eventOrganizer.findUnique({
      where: {
        id: id
      },
      include: {
        allowedUsers: true
      }
    });
    if (eventOrganizer) {
      res.status(200).send(eventOrganizer);
    } else {
      res.status(404).send({ message: 'Event Organizer not found' });
    }
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

  async update(req: Request, res: Response): Promise<void> {
    const data = req.body;
    data.allowedUsers = data.allowedUsers.map(parseInt);
    const id = Number.parseInt(req.params['id']);

    // const updateEventOrganizer = await prisma.eventOrganizer.update({
    //   where: {
    //     id: id,
    //   },
    //   data: data
    // })

    console.log(data);
    res.status(200).send({ message: 'ok' });
  }

  async getEvents(req: Request, res: Response): Promise<void> {
    const id = Number.parseInt(req.params['id']);
    const eventOrganizer = await prisma.eventOrganizer.findUnique({
      where: {
        id: id
      }
    })

    if (eventOrganizer) {
      const events = await prisma.event.findMany({
        where: {
          eventOrganizerId: id
        },
        select: {
          id: true,
          name: true,
          tagline: true,
          description: true,
          logo: true,
          rsvpDeadline: true,
          hasRsvp: true,
          eventOrganizerId: false
        }
      })

      res.status(200).send({ events: events });
    } else {
      res.status(404).send({ message: 'Event Organizer not found' });
    }
  }

  async verify(req: Request, res: Response): Promise<void> {
    const id = Number.parseInt(req.params['id']);
    const eventOrganizer = await prisma.eventOrganizer.findUnique({
      where: {
        id: id
      }
    })

    if (eventOrganizer) {
      await prisma.eventOrganizer.update({
        where: {
          id: id
        },
        data: {
          verified: true,
          verificationDate: new Date(Date.now())
        }
      })

      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Event Organizer not found' });
    }
  }

  async unverify(req: Request, res: Response): Promise<void> {
    const id = Number.parseInt(req.params['id']);
    const eventOrganizer = await prisma.eventOrganizer.findUnique({
      where: {
        id: id
      }
    })

    if (eventOrganizer) {
      await prisma.eventOrganizer.update({
        where: {
          id: id
        },
        data: {
          verified: false,
          verificationDate: null
        }
      })

      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Event Organizer not found' });
    }
  }
}
export default new Controller();
