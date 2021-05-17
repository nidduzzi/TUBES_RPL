import pino from 'pino';
import morgan from 'morgan';
export const l = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
});

export const m = morgan('dev');
