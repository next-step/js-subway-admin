import {Injectable, Repository} from "@/_core";
import {LineResponse} from "subway-domain";

@Injectable
export class LineRepository extends Repository<LineResponse[]> {
  constructor() {
    super('LINE_REPOSITORY');
  }
}
