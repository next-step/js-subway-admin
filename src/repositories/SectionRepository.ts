import {Injectable, Repository} from "~@core";
import {Section} from "~@domain";

@Injectable
export class SectionRepository extends Repository<Section[]> {
  constructor() {
    super('SECTION_REPOSITORY');
  }
}
