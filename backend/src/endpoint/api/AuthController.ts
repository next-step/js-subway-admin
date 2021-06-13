import {Controller, GetMapping} from "@/core";
import {Request, Response} from "express";

@Controller('/api/auth')
export class AuthController {

  private readonly token: string = 'token';

  @GetMapping('/signup')
  public signup(req: Request, res: Response) {
    return {
      token: this.token
    }
  }

}
