export interface User {
  idx?: number;
  email: string;
  name: string;
  password: string;
}

export interface UserRequest {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
}

export interface Auth {
  idx: number;
  email: string;
  name: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface Station {
  idx: number;
  name: string;
}

export type StationRequest = string;

export interface Section {
  idx: number;
  upStation: number;
  downStation: number;
  line: number;
  distance: number;
  duration: number;
}
export interface SectionResponse {
  idx: number;
  upStation: Station;
  downStation: Station;
  line: Line;
  distance: number;
  duration: number;
}

export interface SectionRequest {
  upStation: number;
  downStation: number;
  line: number;
  distance: number;
  duration: number;
}

export interface Line {
  idx: number;
  name: string;
  color: string;
  upStation: number;
  downStation: number;
  distance: number;
  duration: number;
}

export interface LineResponse {
  idx: number;
  name: string;
  color: string;
  totalDistance: number;
  totalDuration: number;
  stations: Station[];
}

export interface LineRequest {
  name: string;
  color: string;
  upStation: number;
  downStation: number;
  distance: number;
  duration: number;
}
