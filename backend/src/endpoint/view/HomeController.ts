import {RestController, GetMapping} from "@/core";
import {Request, Response} from "express";

@RestController('/')
export class HomeController {

  @GetMapping('/hello')
  public home(request: Request, response: Response): string {
    return 'hello world';
  }

}