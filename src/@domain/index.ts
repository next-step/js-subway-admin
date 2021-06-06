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
  from: number;
  to: number;
  line: number;
}
export interface SectionResponse {
  idx: number;
  from: Station;
  to: Station;
  line: Line;
}

export interface SectionRequest {
  from: Station;
  to: Station;
  line: Line;
}

export interface Line {
  idx: number;
  name: string;
}

export interface LineResponse {
  idx: number;
  name: string;
  stations: Station[];
}

export type LineRequest = string;
