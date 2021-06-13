import {Injectable, Repository} from "~@core";
import {UserResponse} from "subway-domain";

@Injectable
export class UserRepository extends Repository<UserResponse[]> {
  constructor() {
    super('USER_REPOSITORY');
  }
}
