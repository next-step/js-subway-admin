import {Request, Response} from "express";
import {AuthRequest, AuthResponse} from "subway-domain";

import {RestController, Inject, PostMapping} from "@/core";
import {AuthService} from "./auth.service";

@RestController('/api/auth')
export class AuthController {

  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @PostMapping('/login')
  public login({ body }: Request, res: Response): AuthResponse {
    return this.authService.login(body as AuthRequest)
  }

  @PostMapping('/signup')
  public signup(req: Request, res: Response) {

    return {
      path: req.path
    }
  }

}
