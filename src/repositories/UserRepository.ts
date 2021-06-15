import {Repository} from "~@core";
import {User} from "~@domain";

export class UserRepository extends Repository<User[]> {
  constructor() {
    super('USER_REPOSITORY');
  }
}

export const userRepository = new UserRepository();
