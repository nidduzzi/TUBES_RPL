import { Application } from 'express';
import eventsRouter from './api/controllers/events/router';
import usersRouter from './api/controllers/users/router';
import eventOrganizersRouter from './api/controllers/eventOrganizers/router';
import reservationsRouter from './api/controllers/reservations/router';
import adminsRouter from './api/controllers/admins/router';
import tagsRouter from './api/controllers/tags/router';
import paymentsRouter from './api/controllers/payments/router';

export default function routes(app: Application): void {
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/events', eventsRouter);
  app.use('/api/v1/eventOrganizers', eventOrganizersRouter);
  app.use('/api/v1/reservations', reservationsRouter);
  app.use('/api/v1/admins', adminsRouter);
  app.use('/api/v1/tags', tagsRouter);
  app.use('/api/v1/payments', paymentsRouter);
}
