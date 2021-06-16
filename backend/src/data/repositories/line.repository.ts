import {Injectable, Repository} from "@/core";
import {EntityName, LineEntity} from "@/data/entities";

@Injectable
export class LineRepository extends Repository<LineEntity> {
  constructor() {
    super(EntityName.LINES);
  }

  public findByName(name: string) {
    return this.findAll().find(v => v.name === name);
  }

  public findByNotIdxAndName(idx: number, name: string) {
    return this.findAll().find(v => v.idx !== idx && v.name === name);
  }
}
