import {Request, Response} from "express";
import {StationRequest} from "subway-domain";

import {AuthGuard, GetMapping, Inject, PostMapping, RestController, Status} from "@/core";
import {StationService} from "./station.service";
import {HttpStatus} from "subway-constant";

@RestController('/api/stations')
export class StationController {

  constructor(
    @Inject(StationService) private readonly stationService: StationService
  ) {}

  @GetMapping()
  @AuthGuard
  public getStations(request: Request, response: Response, userEmail: string) {
    return this.stationService.getStations();
  }

  @PostMapping()
  @AuthGuard
  @Status(HttpStatus.CREATED)
  public addStation({ body }: Request, response: Response, userEmail: string) {
    this.stationService.addStation(body as StationRequest);
  }

}