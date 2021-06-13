import {Injectable, BaseEntity, Repository} from "@/core";

export interface LineEntity extends BaseEntity {
  name: string;
  sections: number[];
  color: string;
}

@Injectable
export class LineRepository extends Repository<LineEntity> {

}
