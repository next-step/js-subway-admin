import {Injectable, Repository} from "~@core";
import {LineResponse} from "subway-domain";

@Injectable
export class LineRepository extends Repository<LineResponse[]> {
  constructor() {
    super('LINE_REPOSITORY');
  }
}
