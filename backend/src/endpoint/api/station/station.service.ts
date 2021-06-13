import {StationRequest, StationResponse} from "subway-domain";

import {Inject, Injectable} from "@/core";
import {StationRepository} from "@/data";
import {ExistedStationException} from "./station.exception";

@Injectable
export class StationService {

  constructor(
    @Inject(StationRepository) private readonly stationRepository: StationRepository
  ) {}

  public getStations(): StationResponse[] {
    return this.stationRepository.findAll().map(({ idx, name }) => ({ idx, name }));
  }

  public addStation({ name }: StationRequest) {
    const station = this.stationRepository.findByName(name);
    if (station) {
      throw new ExistedStationException();
    }
    this.stationRepository.save({ name });
  }

}