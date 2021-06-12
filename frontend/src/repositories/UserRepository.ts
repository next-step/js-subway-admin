import {Injectable, Repository} from "~@core";
import {UserResponse} from "@domain";

@Injectable
export class UserRepository extends Repository<UserResponse[]> {
  constructor() {
    super('USER_REPOSITORY');
  }
}
