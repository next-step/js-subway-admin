import {Injectable, Repository} from "@/core";
import {EntityName, LineEntity} from "@/data/entities";

@Injectable
export class LineRepository extends Repository<LineEntity> {
  constructor() {
    super(EntityName.LINES);
  }
}
