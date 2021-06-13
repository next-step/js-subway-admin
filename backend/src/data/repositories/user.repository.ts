import {Injectable, Repository} from "@/core";
import {EntityName, UserEntity} from "@/data/entities";

@Injectable
export class UserRepository extends Repository<UserEntity> {

  constructor() {
    super(EntityName.USERS);
  }

  public findByEmail(email: string): UserEntity | undefined {
    return this.findAll().find(v => v.email === email);
  }

  public findByEmailAndPassword(email: string, password: string): UserEntity | undefined {
    return this.findAll().find(v => v.email === email && v.password === password);
  }

}
