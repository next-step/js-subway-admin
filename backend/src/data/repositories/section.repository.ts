import {Injectable, Repository} from "@/core";
import {EntityName, SectionEntity} from "@/data/entities";

@Injectable
export class SectionRepository extends Repository<SectionEntity> {

  constructor() {
    super(EntityName.SECTIONS);
  }

}
