interface Scope {
  id: number;
  role: string;
}

interface JwtDataStore {
  scopes: Array<Scope>;
}

export default JwtDataStore;
