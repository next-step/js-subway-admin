import {LineRequest, LineResponse, LineUpdateRequest} from "subway-domain";

import {Inject, Injectable} from "@/core";
import {LineEntity, LineRepository, SectionRepository, StationRepository} from "@/data";
import {
  EqualsStationException,
  ExistedLineException,
  NotFoundLineException,
  NotFoundStationException
} from "@/endpoint";

@Injectable
export class LineService {
  constructor(
    @Inject(LineRepository) private readonly lineRepository: LineRepository,
    @Inject(SectionRepository) private readonly sectionRepository: SectionRepository,
    @Inject(StationRepository) private readonly stationRepository: StationRepository,
  ) {}

  public getLines(): LineResponse[] {
    const lines = this.lineRepository.findAll();

    return lines.map(({ idx, name, color }) => ({ idx, name, color }));
  }

  private getLine(idx: number): LineEntity {
    const line = this.lineRepository.findByIdx(idx);
    if (!line) {
      throw new NotFoundLineException();
    }
    return line;
  }

  public getLineWithStations(idx: number): LineResponse {
    const line = this.getLine(idx);
    const { sections } = line;

    return {
      idx: line.idx,
      name: line.name,
      color: line.color,
      stations: [
        ...new Set<number>(
          sections.map(this.sectionRepository.findByIdx.bind(this))
                  .flatMap(({ upStation, downStation }) => [ upStation, downStation ])
        )]
        .map(this.stationRepository.findByIdx.bind(this))
        .map(({ idx, name }) => ({ idx, name })),
    }
  }

  public addLine(lineRequest: LineRequest) {
    const {name, color} = lineRequest;

    if (this.lineRepository.findByName(name)) {
      throw new ExistedLineException();
    }

    const upStation = this.stationRepository.findByIdx(lineRequest.upStation);
    const downStation = this.stationRepository.findByIdx(lineRequest.downStation);

    if (upStation === undefined || downStation === undefined) {
      throw new NotFoundStationException();
    }

    if (upStation === downStation) {
      throw new EqualsStationException();
    }

    const line  = this.lineRepository.save({ name, color, sections: [] });
    const section = this.sectionRepository.save({
      line: line.idx,
      upStation: upStation.idx,
      downStation: downStation.idx,
      distance: lineRequest.distance,
      duration: lineRequest.duration
    });
    line.sections.push(section.idx);

    this.lineRepository.save(line);
  }

  public updateLine({ idx, name, color }: LineUpdateRequest) {
    const line = this.getLine(idx);

    if (this.lineRepository.findByNotIdxAndName(idx, name)) {
      throw new ExistedLineException();
    }

    this.lineRepository.save({ ...line, color, name });
  }

  public removeLine(idx: number) {
    const line: LineEntity = this.getLine(idx);
    this.lineRepository.remove(line);

    this.sectionRepository
        .findAll()
        .filter(v => v.line === line.idx)
        .forEach(v => this.sectionRepository.remove(v));
  }
}
