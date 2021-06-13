import {Injectable, Repository} from "@/_core";
import {UserResponse} from "subway-domain";

@Injectable
export class UserRepository extends Repository<UserResponse[]> {
  constructor() {
    super('USER_REPOSITORY');
  }
}
