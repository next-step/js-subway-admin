import {LineRequest, LineResponse, LineUpdateRequest, SectionRequest} from "subway-domain";

import {Inject, Injectable} from "@/core";
import {
  LineEntity,
  LineRepository,
  SectionEntity,
  SectionRepository,
  StationEntity,
  StationRepository
} from "@/data";
import {
  DisconnectedStationException,
  EqualsStationException,
  ExistedLineException,
  ExistedSectionException,
  NotFoundLineException,
  NotFoundStationException,
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
    const sections = this.getSections(line.idx);

    const sumOf = (key: 'duration' | 'distance') => {
      return sections.reduce((sum: number, section) => sum + section[key], 0);
    }

    return {
      idx: line.idx,
      name: line.name,
      color: line.color,
      stations: this.getStations(sections).map(({ idx, name }) => ({ idx, name })),
      duration: sumOf('duration'),
      distance: sumOf('distance'),
    }
  }

  private getSections(lineIdx: number) {
    return this.sectionRepository.findAll().filter(v => v.line === lineIdx);
  }

  private getStations(sections: SectionEntity[]): StationEntity[] {
    const stationIdxSet = new Set(
      sections.flatMap(({ upStation, downStation }) => [ upStation, downStation ])
    );

    return [ ...stationIdxSet ].map(v => this.stationRepository.findByIdx(v));
  }

  public addLine(lineRequest: LineRequest) {
    const {name, color, upStation, downStation, distance, duration} = lineRequest;

    if (this.lineRepository.findByName(name)) {
      throw new ExistedLineException();
    }

    const line = this.lineRepository.save({name, color});

    try {
      this.addSection(line.idx, {upStation, downStation, distance, duration});
    } catch (e) {
      this.lineRepository.remove(line);
      throw e;
    }
  }

  public updateLine(idx, { name, color }: LineUpdateRequest) {
    const line = this.getLine(idx);

    if (this.lineRepository.findByNotIdxAndName(idx, name)) {
      throw new ExistedLineException();
    }

    this.lineRepository.save({ ...line, color, name });
  }

  public removeLine(idx: number) {
    const line: LineEntity = this.getLine(idx);
    this.lineRepository.remove(line);
    this.getSections(line.idx).forEach(v => this.sectionRepository.remove(v));
  }

  public addSection(idx, {upStation, downStation, distance, duration}: SectionRequest) {
    if (
      !this.stationRepository.findByIdx(upStation) ||
      !this.stationRepository.findByIdx(downStation)
    ) {
      throw new NotFoundStationException();
    }

    if (upStation === downStation) {
      throw new EqualsStationException();
    }

    const sections = this.getSections(idx);
    const connectedUpStation = !!sections.find(v => [v.upStation, v.downStation].includes(upStation));
    const connectedDownStation = !!sections.find(v => [v.upStation, v.downStation].includes(downStation));
    if (!connectedDownStation && !connectedUpStation) {
      throw new DisconnectedStationException();
    }
    if (connectedUpStation && connectedDownStation) {
      throw new ExistedSectionException();
    }

    this.sectionRepository.save({ line: idx, upStation, downStation, distance, duration });
  }

  public removeSection(idx: number, stationIdx: number) {
    const line = this.getLine(idx);
    const sections = this.getSections(line.idx);
    const willRemoveSections = sections.filter(v => v.upStation === stationIdx || v.downStation === stationIdx);
    for (const section of willRemoveSections) {
      this.sectionRepository.remove(section);
    }

    if (willRemoveSections.length < 2) return;
    this.addSection(idx, {
      upStation: willRemoveSections.find(v => v.downStation === stationIdx).upStation,
      downStation: willRemoveSections.find(v => v.upStation === stationIdx).downStation,
      distance: willRemoveSections[0].distance + willRemoveSections[1].distance,
      duration: willRemoveSections[0].duration + willRemoveSections[1].duration,
    });
  }
}
