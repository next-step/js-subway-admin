import {Inject, Injectable, RestClient} from "@/_core";
import {AuthRepository} from "@/repositories";

@Injectable
export class SubwayClient extends RestClient {
  constructor(
    @Inject(AuthRepository) private readonly authRepository: AuthRepository
  ) {
    super(`${location.origin}/api/`);

    this.addRequestInterceptor((request: RequestInit) => {
      const authentication = authRepository.get();
      if (!authentication) return request;

      return {
        ...request,
        headers: {
          ...request.headers || {},
          Authorization: `Bearer ${authentication.token}`,
        }
      }
    });
  }
}
