interface UserI {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class User implements UserI {
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  id: string;
}
