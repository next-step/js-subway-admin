import {Request} from "express";
import {StationRequest} from "subway-domain";

import {AuthGuard, DeleteMapping, GetMapping, Inject, PostMapping, PutMapping, RestController, Status} from "@/core";
import {StationService} from "./station.service";
import {HttpStatus} from "subway-constant";

@RestController('/api/stations')
export class StationController {

  constructor(
    @Inject(StationService) private readonly stationService: StationService
  ) {}

  @GetMapping()
  @AuthGuard
  public getStations() {
    return this.stationService.getStations();
  }

  @PostMapping()
  @AuthGuard
  @Status(HttpStatus.CREATED)
  public addStation({ body }: Request) {
    this.stationService.addStation(body as StationRequest);
  }

  @PutMapping('/:idx')
  @AuthGuard
  @Status(HttpStatus.NO_CONTENT)
  public updateStation({ body, params }: Request) {
    this.stationService.updateStation(
      Number(params.idx),
      body.name
    );
  }

  @DeleteMapping('/:idx')
  @AuthGuard
  @Status(HttpStatus.NO_CONTENT)
  public removeStation({ params }: Request) {
    this.stationService.removeStation(Number(params.idx));
  }

}
