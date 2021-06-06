import {Repository} from "~@core";
import {Station} from "~@domain";

export class StationRepository extends Repository<Station[]> {
  constructor() {
    super('STATION_REPOSITORY');
  }
}

export const stationRepository = new StationRepository();
