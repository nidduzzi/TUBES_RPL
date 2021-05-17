import expressjwt from 'express-jwt';
import '../../common/env';
import { Request, Response, NextFunction } from 'express';
import JwtDataStore from '../interfaces/jwtDataStore.interface';

interface scopeValidator {
  role: string;
  idValidator?: (id: number, roleId: number) => boolean;
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
      algorithms: ['HS256'],
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
<<<<<<< HEAD
          `Bearer scope="${expectedScopes.join(' ') +
          (req.params['id'] ? ' id:' + req.params['id'] : '')
=======
          `Bearer scope="${
            expectedScopes
              .map((sv) => sv.role + sv?.idValidator?.toString)
              .join(' ') + (req.params['id'] ? ' id:' + req.params['id'] : '')
>>>>>>> f57a8f7c5b4fd349b98a2eb66a57e8aa00902dd9
          }", error="${err_message}"`
        );
        res.status(403).send({ message: err_message });
      };
      const user = req.user as JwtDataStore;
      // verify user permissions
      let allowed = false;
      const id = Number.parseInt(req.params.id ?? '-1');
      if (options && options.checkAllScopes) {
        // check all scopes provided in the request
        allowed = user.scopes.every((scope) =>
          // against scopes expected for the path
          expectedScopes.some(
            (expectedScope) =>
              // validate role
              scope.role == expectedScope.role &&
              // validate id if provided with id validator by expected scopes
              (expectedScope.idValidator != undefined && id != NaN
                ? expectedScope.idValidator(id, scope.id)
                : true)
          )
        );
      } else {
        // check scopes provided in the request if at least one satisfy the expected scopes
        allowed = user.scopes.some((scope) =>
          expectedScopes.some(
            (expectedScope) =>
              // validate role
              scope.role == expectedScope.role &&
              // validate id if provided with id validator by expected scopes
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
