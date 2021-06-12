import {Injectable, Repository} from "~@core";
import {Auth} from "~@domain";

@Injectable
export class AuthRepository extends Repository<Auth> {
  constructor() {
    super('AUTH_REPOSITORY', sessionStorage);
  }
}
