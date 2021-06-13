import {Injectable, Repository} from "@/_core";
import {SectionResponse} from "subway-domain";

@Injectable
export class SectionRepository extends Repository<SectionResponse[]> {
  constructor() {
    super('SECTION_REPOSITORY');
  }
}
