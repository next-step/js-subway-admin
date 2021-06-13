import {Controller, GetMapping} from "@/core";
import {Request, Response} from "express";

@Controller('/api/auth')
export class AuthController {

  @GetMapping('/signup')
  public signup(req: Request, res: Response) {
    return {
      path: req.path
    }
  }

}
