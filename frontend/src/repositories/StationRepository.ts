import {Injectable, Repository} from "@/@core";
import {StationResponse} from "subway-domain";

@Injectable
export class StationRepository extends Repository<StationResponse[]> {
  constructor() {
    super('STATION_REPOSITORY');
  }
}
