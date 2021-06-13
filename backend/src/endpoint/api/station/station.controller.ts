import {AuthGuard, GetMapping, RestController, UnauthorizedException} from "@/core";
import {Request, Response} from "express";

@RestController('/api/stations')
export class StationController {

  constructor() {}

  @GetMapping()
  @AuthGuard
  public getStations(request: Request, response: Response, userEmail: string) {
    console.log({ userEmail });
    return {
      stations: []
    }
  }

}