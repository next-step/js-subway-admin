import {StationRepository} from "~repositories";
import {Station, StationRequest} from "~@domain";
import {ExistedStationError, NotFoundStationError} from "~exceptions";
import {getNextIdx} from "~utils";
import {Inject, Injectable} from "~@core";

@Injectable
export class StationService {
  constructor(
    @Inject(StationRepository) private readonly stationRepository: StationRepository
  ) {}

  public getStations(): Station[] {
    return this.stationRepository.get() || [];
  }

  private getStationIndex(idx: number, stations: Station[] = this.getStations()): number {
    const index = stations.findIndex(v => v.idx === idx);
    if (index === -1) {
      throw new NotFoundStationError();
    }
    return index;
  }

  public addStation(request: StationRequest): void {
    const stations = this.getStations();
    const has = !!stations.find(v => v.name === request);
    if (has) {
      throw new ExistedStationError();
    }

    this.stationRepository.set([
      ...stations,
      {
        idx: getNextIdx(),
        name: request,
      }
    ]);
  }

  public updateStation(station: Station) {
    const stations = this.getStations();
    const index = this.getStationIndex(station.idx, stations);
    if (stations.find(v => v.idx !== station.idx &&  v.name === station.name)) {
      throw new ExistedStationError();
    }
    stations[index] = station;

    this.stationRepository.set(stations);
  }

  public removeStation(station: Station) {
    const stations = this.getStations();
    const index = this.getStationIndex(station.idx, stations);
    stations.splice(index, 1);
    this.stationRepository.set(stations);
  }
}
