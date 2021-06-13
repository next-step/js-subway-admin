import {Injectable, Repository} from "~@core";
import {SectionResponse} from "subway-domain";

@Injectable
export class SectionRepository extends Repository<SectionResponse[]> {
  constructor() {
    super('SECTION_REPOSITORY');
  }
}
