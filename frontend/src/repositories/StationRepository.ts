import {Injectable, Repository} from "@/_core";
import {StationResponse} from "subway-domain";

@Injectable
export class StationRepository extends Repository<StationResponse[]> {
  constructor() {
    super('STATION_REPOSITORY');
  }
}
