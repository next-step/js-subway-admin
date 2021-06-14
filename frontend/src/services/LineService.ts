import {LineResponse, LineRequest, LineUpdateRequest, SectionRequest} from "subway-domain";
import {Inject, Injectable} from "@/_core";
import {SubwayClient} from "@/clients";

@Injectable
export class LineService {
  constructor(
    @Inject(SubwayClient) private readonly subwayClient: SubwayClient,
  ) {}

  public getLines(): Promise<LineResponse[]> {
    return this.subwayClient.get('/lines');
  }

  public getLine(idx: number): Promise<LineResponse> {
    return this.subwayClient.get(`/lines/${idx}`);
  }

  public addLine(request: LineRequest): Promise<void> {
    return this.subwayClient.post('/lines', request);
  }

  public addLineSection(idx: number, request: SectionRequest) {
    return this.subwayClient.post(`/lines/${idx}/sections`, request);
  }

  public updateLine(idx: number, request: LineUpdateRequest): Promise<void> {
    return this.subwayClient.put(`/lines/${idx}`, request);
  }

  public removeLine(idx: number): Promise<void> {
    return this.subwayClient.delete(`/lines/${idx}`);
  }

  public removeSection(idx: number, stationIdx: number): Promise<void> {
    return this.subwayClient.delete(`/lines/${idx}/sections?stationId=${stationIdx}`);
  }
}
