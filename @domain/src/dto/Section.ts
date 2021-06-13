export interface SectionResponse {
  idx: number;
  upStation: number;
  downStation: number;
  line: number;
}

export interface SectionRequest {
  upStation: number;
  downStation: number;
  distance: number;
  duration: number;
}
