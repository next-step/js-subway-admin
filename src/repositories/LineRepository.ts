import {Injectable, Repository} from "~@core";
import {Line} from "~@domain";

@Injectable
export class LineRepository extends Repository<Line[]> {
  constructor() {
    super('LINE_REPOSITORY');
  }
}
