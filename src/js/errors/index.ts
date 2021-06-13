export const NO_USER_ERROR = new Error("존재하지 않는 계정입니다.");
export const WRONG_PASSWORD_ERROR = new Error("잘못된 비밀번호 입니다.");

export const DUPLICATED_EMAIL_ERROR = new Error("이미 존재하는 이메일입니다.");
export const DUPLICATED_STATION_ERROR = new Error("이미 존재하는 역 입니다.");
export const DUPLICATED_LINE_ERROR = new Error(
  "이미 존재하는 노선 이름입니다."
);

export const NOT_CORRECT_PASSWORD_ERROR = new Error(
  "비밀번호가 일치하지 않습니다."
);
export const NOT_CORRECT_STATION_ERROR = new Error(
  "올바르지 않은 역 이름입니다. 2글자 이상, 20글자 이하로 입력해주세요."
);
export const NOT_CORRECT_LINE_ERROR = new Error(
  "상행역과 하행역은 같을 수 없습니다."
);

export const STATION_REMOVE_NOT_POSSIBLE_ERROR = new Error(
  "이미 노선으로 등록된 역이므로 삭제 불가능 합니다. 노선을 먼저 삭제해주세요."
);
export const NO_STATION_ERROR = new Error("등록가능한 역이 없습니다.");

export const SERVER_ERROR = new Error("잠시 서버에 문제가 생겼어요.");
export const CLIENT_ERROR = new Error("잠시 후에 다시 시도해주세요");
