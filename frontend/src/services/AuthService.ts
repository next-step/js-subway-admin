import {AuthRequest, AuthResponse, UserRequest} from "subway-domain";

import {Inject, Injectable} from "@/_core";
import {SubwayClient} from "@/clients";
import {AuthRepository} from "@/repositories";

@Injectable
export class AuthService {
  constructor(
    @Inject(SubwayClient) private readonly restClient: SubwayClient,
    @Inject(AuthRepository) private readonly authRepository: AuthRepository,
  ) {}

  public async login(request: AuthRequest): Promise<AuthResponse> {
    const { token } = await this.restClient.post('/auth/login', request);
    this.authRepository.set({ token });
    return { token };
  }

  public logout() {
    this.authRepository.clear();
  }

  public getAuth(): AuthResponse | null {
    return this.authRepository.get();
  }

  public signup(request: UserRequest): Promise<void> {
    return this.restClient.post('/auth/signup', request);
  }
}
