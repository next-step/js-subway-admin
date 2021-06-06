import {lineRepository, LineRepository} from "~repositories";
import {Line, LineRequest} from "~@domain";
import {ExistedLineError, NotFoundLineError} from "~exceptions";
import {getNextIdx} from "~utils";

export class LineService {
  constructor(
    private readonly lineRepository: LineRepository
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
    const has = !!lines.find(v => v.name === request);
    if (has) {
      throw new ExistedLineError();
    }

    this.lineRepository.set([
      ...lines,
      {
        idx: getNextIdx(),
        name: request,
      }
    ]);
  }

  public updateLine(line: Line) {
    const lines = this.getLines();
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

export const lineService = new LineService(lineRepository);
