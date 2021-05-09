import expressjwt from 'express-jwt';
import '../../common/env';
import { Request, Response, NextFunction } from 'express';
import JwtDataStore from '../interfaces/jwtDataStore.interface';

interface scopeValidator {
  role: string;
  idValidator?: (id: number, userId: number) => boolean;
}

interface options {
  checkAllScopes?: boolean;
  failWithError?: boolean;
}

export const checkPermissions = (
  expectedScopes: scopeValidator[],
  options?: options
): Array<any> => {
  return [
    expressjwt({
      secret: process.env.SESSION_SECRET ?? 'TEMPORARYSECRETTTTT',
      algorithms: ['HS265'],
    }),
    (req: Request, res: Response, next: NextFunction): void => {
      const error = (res: Response) => {
        const err_message = 'Insufficient scope';

        if (options && options.failWithError) {
          return next({
            statusCode: 403,
            error: 'Forbidden',
            message: err_message,
          });
        }

        res.append(
          'WWW-Authenticate',
          `Bearer scope="${
            expectedScopes.join(' ') +
            (req.params['id'] ? ' id:' + req.params['id'] : '')
          }", error="${err_message}"`
        );
        res.status(403).send(err_message);
      };
      const user = req.user as JwtDataStore;
      // verify user permissions
      let allowed = false;
      const id = Number.parseInt(req.params['id']);
      if (options && options.checkAllScopes) {
        allowed = user.scopes.every((scope) =>
          expectedScopes.every(
            (expectedScope) =>
              scope.role == expectedScope.role &&
              (expectedScope.idValidator != undefined && id != NaN
                ? expectedScope.idValidator(id, scope.id)
                : true)
          )
        );
      } else {
        allowed = user.scopes.some((scope) =>
          expectedScopes.every(
            (expectedScope) =>
              scope.role == expectedScope.role &&
              (expectedScope.idValidator != undefined && id != NaN
                ? expectedScope.idValidator(id, scope.id)
                : true)
          )
        );
      }
      return allowed ? next() : error(res);
    },
  ];
};

export default checkPermissions;
