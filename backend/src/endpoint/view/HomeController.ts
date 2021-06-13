import {Controller, GetMapping} from "@/core";
import {Request, Response} from "express";

@Controller('/')
export class HomeController {

  @GetMapping()
  public home(request: Request, response: Response): string {
    return 'hello world';
  }

}