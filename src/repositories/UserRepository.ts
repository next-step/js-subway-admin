import {Injectable, Repository} from "~@core";
import {User} from "~@domain";

@Injectable
export class UserRepository extends Repository<User[]> {
  constructor() {
    super('USER_REPOSITORY');
  }
}
