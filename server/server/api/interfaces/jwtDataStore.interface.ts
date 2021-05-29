import { Scope } from './authentification.interface';

export default interface JwtDataStore {
  scopes: Array<Scope>;
}
