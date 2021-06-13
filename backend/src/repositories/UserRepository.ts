import {Injectable, BaseEntity, Repository} from "@/core";

export interface UserEntity extends BaseEntity {
  name: string;
  email: string;
  password: string;
}

@Injectable
export class UserRepository extends Repository<UserEntity> {

}
