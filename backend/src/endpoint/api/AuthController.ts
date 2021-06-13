import {RestController, GetMapping} from "@/core";
import {Request, Response} from "express";

@RestController('/api/auth')
export class AuthController {

  @GetMapping('/signup')
  public signup(req: Request, res: Response) {
    return {
      path: req.path
    }
  }

}
