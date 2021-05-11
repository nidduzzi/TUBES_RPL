import './common/env';
import Server from './common/server';
import routes from './routes';
import 'source-map-support/register';

process.on('unhandledRejection', console.log);
if (!process.env.SESSION_SECRET) {
  process.env.SESSION_SECRET = 'TEMPORARYSECRETTTTT';
}

const port = parseInt(process.env.PORT ?? '9000');
export default new Server().router(routes).listen(port);
console.log(
  'Your server is listening on port %d (http://localhost:%d/api/v1)',
  port,
  port
);
console.log(
  'Swagger-ui is available on http://localhost:%d/api-explorer',
  port
);
