import {Injectable, Repository} from "@/_core";
import {AuthResponse} from "subway-domain";

@Injectable
export class AuthRepository extends Repository<AuthResponse> {
  constructor() {
    super('AUTH_REPOSITORY');
  }
}
