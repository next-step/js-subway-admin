import {Injectable, BaseEntity, Repository} from "@/core";

export interface SectionEntity extends BaseEntity {
  upStation: number;
  downStation: number;
  distance: number;
  duration: number;
  line: number;
}

@Injectable
export class SectionRepository extends Repository<SectionEntity> {

}
