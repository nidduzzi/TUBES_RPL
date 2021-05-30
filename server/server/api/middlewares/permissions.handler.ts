import expressjwt from 'express-jwt';
import '../../common/env';
import { Request, Response, NextFunction } from 'express';
import JwtDataStore from '../interfaces/jwtDataStore.interface';

interface scopeValidator {
  role: string;
  idValidator?: (id: number, roleId: number) => boolean | Promise<boolean>;
}

interface options {
  checkAllScopes?: boolean;
  failWithError?: boolean;
  credentialsRequired?: boolean;
}

export const checkPermissions = (
  expectedScopes: scopeValidator[],
  options?: options
): Array<any> => {
  if (process.env.DISABLE_SECURITY_PERMISSIONS == 'all') {
    return [];
  } else if (process.env.DISABLE_SECURITY_PERMISSIONS == 'jwt') {
    return [
      expressjwt({
        secret: process.env.SESSION_SECRET ?? 'TEMPORARYSECRETTTTT',
        algorithms: ['HS256'],
      }),
    ];
  }
  return [
    expressjwt({
      secret: process.env.SESSION_SECRET ?? 'TEMPORARYSECRETTTTT',
      algorithms: ['HS256'],
      credentialsRequired: options?.credentialsRequired,
    }),
    (req: Request, res: Response, next: NextFunction): void => {
      const error = (res: Response) => {
        const err_message = 'Insufficient scope';

        if (options && options.failWithError) {
          return next({
            status: 403,
            errors: 'Forbidden',
            message: err_message,
          });
        }

        res.append(
          'WWW-Authenticate',
          `Bearer scope="${
            expectedScopes
              .map((sv) => sv.role + sv?.idValidator?.toString)
              .join(' ') + (req.params['id'] ? ' id:' + req.params['id'] : '')
          }", error="${err_message}"`
        );
        res.status(403).send({ message: err_message });
      };
      // verify user permissions
      let allowed = !options?.credentialsRequired ?? false;
      const user = req.user as JwtDataStore;
      if (!allowed && user) {
        const id: number = Number.parseInt(req.params.id);
        if (options && options.checkAllScopes) {
          // check all scopes provided in the request
          allowed = user.scopes.every((scope) =>
            // against scopes expected for the path
            expectedScopes.some(
              async (expectedScope) =>
                // validate role
                scope.role == expectedScope.role &&
                // validate id if provided with id validator by expected scopes
                (expectedScope.idValidator != undefined
                  ? await expectedScope.idValidator(id, scope.id)
                  : true)
            )
          );
        } else {
          // check scopes provided in the request if at least one satisfy the expected scopes
          allowed = user.scopes.some((scope) =>
            expectedScopes.some(
              async (expectedScope) =>
                // validate role
                scope.role == expectedScope.role &&
                // validate id if provided with id validator by expected scopes
                (expectedScope.idValidator != undefined && id != NaN
                  ? await expectedScope.idValidator(id, scope.id)
                  : true)
            )
          );
        }
      }
      return allowed ? next() : error(res);
    },
  ];
};

export default checkPermissions;
