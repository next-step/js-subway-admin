export class NotFoundUserError extends Error {

  public static readonly message: string = '아이디 또는 비밀번호가 일치하지 않습니다.';

  constructor() {
    super(NotFoundUserError.message);
  }
}

export class ExistUserError extends Error {

  public static readonly message: string = '이미 존재하는 사용자입니다.';

  constructor() {
    super(ExistUserError.message);
  }
}
