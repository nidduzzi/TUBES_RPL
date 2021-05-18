import { Application } from 'express';
import eventsRouter from './api/controllers/events/router';
import usersRouter from './api/controllers/users/router';
import eventOrganizersRouter from './api/controllers/eventOrganizers/router';

export default function routes(app: Application): void {
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/events', eventsRouter);
  app.use('/api/v1/eventOrganizers', eventOrganizersRouter);
}
