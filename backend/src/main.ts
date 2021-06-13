import {Request, Response} from "express";

import {Controller, GetMapping} from "@/core";

@Controller('/')
class HomeController {

  @GetMapping()
  public home(request: Request, response: Response) {
    return 'hello world';
  }

}

