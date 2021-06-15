import {Repository} from "~@core";
import {Line} from "~@domain";

export class LineRepository extends Repository<Line[]> {
  constructor() {
    super('LINE_REPOSITORY');
  }
}

export const lineRepository = new LineRepository();
