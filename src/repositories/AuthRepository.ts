import {Repository} from "~@core";
import {Auth} from "~@domain";

export class AuthRepository extends Repository<Auth> {
  constructor() {
    super('AUTH_REPOSITORY', sessionStorage);
  }
}

export const authRepository = new AuthRepository();
