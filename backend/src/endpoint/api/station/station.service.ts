import {StationRequest, StationResponse} from "subway-domain";

import {Inject, Injectable} from "@/core";
import {LineRepository, SectionRepository, StationRepository} from "@/data";
import {ContainsAtLineException, ExistedStationException, NotFoundStationException} from "./station.exception";

@Injectable
export class StationService {

  constructor(
    @Inject(StationRepository) private readonly stationRepository: StationRepository,
    @Inject(SectionRepository) private readonly sectionRepository: SectionRepository,
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

  public updateStation(idx, name) {
    const stations = this.stationRepository.findAll();
    const station = stations.find(v => v.idx !== idx && v.name === name);
    if (station) {
      throw new ExistedStationException();
    }
    this.stationRepository.save({ idx, name });
  }

  public removeStation(idx) {
    const station = this.stationRepository.findByIdx(idx);
    if (!station) {
      throw new NotFoundStationException();
    }

    for (const { upStation, downStation } of this.sectionRepository.findAll()) {
      if ([upStation, downStation].includes(station.idx)) {
        throw new ContainsAtLineException();
      }
    }

    this.stationRepository.remove(station);
  }

}