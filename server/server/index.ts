import './common/env';
import Server from './common/server';
import routes from './routes';
import 'source-map-support/register';

process.on('unhandledRejection', console.log);
if (!process.env.SESSION_SECRET) {
  process.env.SESSION_SECRET = 'TEMPORARYSECRETTTTT';
}
if (process.env.DISABLE_SECURITY_PERMISSIONS) {
  console.warn(
    '\n######################\nSECURITY IS DISABLED!!\n######################\n'
  );
}
if (process.env.ALLOW_ADMIN_REGISTRATION == 'true') {
  console.warn(
    '\n###############################\nADMIN REGISTRATION IS ENABLED!!\n###############################\n'
  );
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
