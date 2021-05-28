import { Scope } from './authentification.interface';

export interface Authentificated {
  auth: Array<Scope>;
  jwtToken: string;
}
