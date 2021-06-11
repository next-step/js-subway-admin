import {Injectable, Repository} from "~@core";
import {Station} from "~@domain";

@Injectable
export class StationRepository extends Repository<Station[]> {
  constructor() {
    super('STATION_REPOSITORY');
  }
}
