import {AuthRequest, AuthResponse, UpdateUserRequest, UserRequest} from "subway-domain";
import * as jwt from 'jsonwebtoken';

import {Inject, Injectable} from "@/core";
import {UserEntity, UserRepository} from "@/data";
import {ExistUserException, NotFoundUserException} from "@/endpoint";

@Injectable
export class AuthService {

  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  public signup({ name, email, password }: UserRequest): void {
    const user = this.userRepository.findByEmail(email);

    if (user) {
      throw new ExistUserException();
    }

    this.userRepository.save({ name, email, password });
  }

  public async login({ email, password }: AuthRequest): Promise<AuthResponse> {
    const user = this.userRepository.findByEmailAndPassword(email, password);

    if (!user) {
      throw new NotFoundUserException();
    }

    const token: string = await new Promise((resolve, reject) => {
      jwt.sign({
        idx: user.idx,
        name: user.name,
        email: user.email,
      }, 'secret', {
        expiresIn: '7d',
        subject: 'auth'
      }, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      })
    });

    return { token };
  }

  public updateUser({ idx, name, email }: UpdateUserRequest): UserEntity {
    const user = this.userRepository.findByIdx(idx);
    if (!user) {
      throw new NotFoundUserException();
    }

    return this.userRepository.save({ ...user, name, email });
  }

}