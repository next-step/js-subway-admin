import {StationResponse} from "./Station";

export interface LineResponse {
  idx: number;
  name: string;
  color: string;
  stations?: StationResponse[];
  distance?: number;
  duration?: number;
}

export interface LineRequest {
  idx?: number;
  name: string;
  color: string;
  upStation?: number;
  downStation?: number;
  distance?: number;
  duration?: number;
}


export interface LineUpdateRequest {
  name: string;
  color: string;
}
