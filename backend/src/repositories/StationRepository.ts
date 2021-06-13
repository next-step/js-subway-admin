import {Injectable, BaseEntity, Repository} from "@/core";

export interface StationEntity extends BaseEntity {
  name: string;
}

@Injectable
export class StationRepository extends Repository<StationEntity> {

}
