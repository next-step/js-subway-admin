import {Injectable, Repository} from "@/core";
import {EntityName, StationEntity} from "@/data/entities";

@Injectable
export class StationRepository extends Repository<StationEntity> {

  constructor() {
    super(EntityName.STATIONS);
  }

}
