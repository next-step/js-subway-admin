import {StationResponse, StationRequest} from "subway-domain";
import {Inject, Injectable} from "@/_core";
import {SubwayClient} from "@/clients";

@Injectable
export class StationService {
  constructor(
    @Inject(SubwayClient) private readonly subwayClient: SubwayClient
  ) {}

  public getStations(): Promise<StationResponse[]> {
    return this.subwayClient.get('/stations');
  }

  public addStation(request: StationRequest): Promise<void> {
    return this.subwayClient.post('/stations', request);
  }

  public updateStation(idx: number, request: StationRequest): Promise<void> {
    return this.subwayClient.put(`/stations/${idx}`, request);
  }

  public removeStation(idx: number) {
    return this.subwayClient.delete(`/stations/${idx}`);
  }
}
