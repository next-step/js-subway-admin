import {LineRepository, SectionRepository} from "@/repositories";
import {LineResponse, LineRequest, LineUpdateRequest} from "subway-domain";
import {ExistedLineError, NotFoundLineError} from "@/exceptions";
import {getNextIdx} from "@/utils";
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

  public addLine(request: LineRequest): Promise<void> {
    return this.subwayClient.post('/lines', request);
  }

  public updateLine(idx: number, request: LineUpdateRequest): Promise<void> {
    return this.subwayClient.put(`/lines/${idx}`, request);
  }

  public removeLine(idx: number): Promise<void> {
    return this.subwayClient.delete(`/lines/${idx}`);
  }
}
