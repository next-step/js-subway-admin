import {AuthRequest, AuthResponse, UpdateUserRequest, UserRequest} from "subway-domain";

import {Inject, Injectable} from "@/core";
import {UserEntity, UserRepository} from "@/data";
import {ExistUserError, NotFoundUserError} from "@/endpoint";

@Injectable
export class AuthService {

  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  public signUp({ name, email, password }: UserRequest): void {
    const user = this.userRepository.findByEmail(email);

    if (user) {
      throw new ExistUserError();
    }

    this.userRepository.save({ name, email, password });
  }

  public login({ email, password }: AuthRequest): AuthResponse {
    const user = this.userRepository.findByEmailAndPassword(email, password);

    if (!user) {
      throw new NotFoundUserError();
    }

    return {
      idx: user.idx,
      email: user.email,
      name: user.name
    }
  }

  public updateUser({ idx, name, email }: UpdateUserRequest): UserEntity {
    const user = this.userRepository.findByIdx(idx);
    if (!user) {
      throw new NotFoundUserError();
    }

    return this.userRepository.save({ ...user, name, email });
  }

}