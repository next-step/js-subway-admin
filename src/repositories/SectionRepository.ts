import {Repository} from "~@core";
import {Section} from "~@domain";

export class SectionRepository extends Repository<Section[]> {
  constructor() {
    super('SECTION_REPOSITORY');
  }
}

export const sectionRepository = new SectionRepository();
