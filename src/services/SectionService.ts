import {sectionRepository, SectionRepository} from "~repositories";
import {Section, SectionRequest} from "~@domain";
import {ExistedSectionError, NotFoundSectionError} from "~exceptions";
import {getNextIdx} from "~utils";

export class SectionService {
  constructor(
    private readonly sectionRepository: SectionRepository
  ) {}

  public getSections(): Section[] {
    return this.sectionRepository.get() || [];
  }

  private getSectionIndex(idx: number, sections: Section[] = this.getSections()): number {
    const index = sections.findIndex(v => v.idx === idx);
    if (index === -1) {
      throw new NotFoundSectionError();
    }
    return index;
  }

  public addSection({ from, to, line }: SectionRequest): void {
    const sections = this.getSections();
    const has = !!sections.find(v => v.from === from.idx && v.to === to.idx);
    if (has) {
      throw new ExistedSectionError();
    }

    this.sectionRepository.set([
      ...sections,
      {
        idx: getNextIdx(),
        from: from.idx,
        to: to.idx,
        line: line.idx,
      }
    ]);
  }

  public updateSection(section: Section) {
    const sections = this.getSections();
    const index = this.getSectionIndex(section.idx, sections);
    sections[index] = section;

    this.sectionRepository.set(sections);
  }

  public removeSection(section: Section) {
    const sections = this.getSections();
    const index = this.getSectionIndex(section.idx, sections);
    sections.splice(index, 1);
    this.sectionRepository.set(sections);
  }
}

export const sectionService = new SectionService(sectionRepository);
