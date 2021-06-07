import {lineRepository, LineRepository, sectionRepository, SectionRepository} from "~repositories";
import {Line, LineRequest} from "~@domain";
import {ExistedLineError, NotFoundLineError} from "~exceptions";
import {getNextIdx} from "~utils";
import get = Reflect.get;

export class LineService {
  constructor(
    private readonly lineRepository: LineRepository,
    private readonly sectionRepository: SectionRepository,
  ) {}

  public getLines(): Line[] {
    return this.lineRepository.get() || [];
  }

  private getLineIndex(idx: number, lines: Line[] = this.getLines()): number {
    const index = lines.findIndex(v => v.idx === idx);
    if (index === -1) {
      throw new NotFoundLineError();
    }
    return index;
  }

  public addLine(request: LineRequest): void {
    const lines = this.getLines();
    const has = !!lines.find(v => v.name === request.name);

    if (has) {
      throw new ExistedLineError();
    }

    this.lineRepository.set([ ...lines, { ...request, idx: getNextIdx() } ]);

  }

  public updateLine(line: Line) {
    const lines = this.getLines();
    const has = !!lines.find(v => v.idx !== line.idx && v.name === line.name);

    if (has) {
      throw new ExistedLineError();
    }

    const index = this.getLineIndex(line.idx, lines);
    lines[index] = line;

    this.lineRepository.set(lines);
  }

  public removeLine(line: Line) {
    const lines = this.getLines();
    const index = this.getLineIndex(line.idx, lines);
    lines.splice(index, 1);
    this.lineRepository.set(lines);
  }
}

export const lineService = new LineService(lineRepository, sectionRepository);
