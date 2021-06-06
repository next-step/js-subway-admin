export class ExistedUserError extends Error {
  public static readonly message: string = '이미 가입한 회원의 정보입니다.';

  constructor() {
    super(ExistedUserError.message);
  }
}

export class InvalidCredentialError extends Error {
  public static readonly message: string = '이메일 또는 비밀번호가 일치하지 않습니다.';

  constructor() {
    super(InvalidCredentialError.message);
  }
}
