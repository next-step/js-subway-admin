import {Request, Response} from "express";
import {AuthRequest, AuthResponse, UserRequest} from "subway-domain";

import {RestController, Inject, PostMapping} from "@/core";
import {AuthService} from "./auth.service";

@RestController('/api/auth')
export class AuthController {

  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @PostMapping('/login')
  public login({ body }: Request, res: Response): AuthResponse {
    res.status(201);
    return this.authService.login(body as AuthRequest)
  }

  @PostMapping('/signup')
  public signup({ body }: Request, res: Response) {
    this.authService.signup(body as UserRequest);
    res.status(201);
  }

}
