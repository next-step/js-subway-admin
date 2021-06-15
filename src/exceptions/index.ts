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

export class ExistedStationError extends Error {
  public static readonly message: string = '이미 존재하는 역입니다.';

  constructor() {
    super(ExistedStationError.message);
  }
}

export class NotFoundStationError extends Error {
  public static readonly message: string = '존재하지 않는 역입니다.';

  constructor() {
    super(NotFoundStationError.message);
  }
}


export class ExistedLineError extends Error {
  public static readonly message: string = '이미 존재하는 노선입니다.';

  constructor() {
    super(ExistedLineError.message);
  }
}

export class NotFoundLineError extends Error {
  public static readonly message: string = '존재하지 않는 노선입니다.';

  constructor() {
    super(NotFoundLineError.message);
  }
}



export class ExistedSectionError extends Error {
  public static readonly message: string = '이미 존재하는 구간입니다.';

  constructor() {
    super(ExistedSectionError.message);
  }
}

export class NotFoundSectionError extends Error {
  public static readonly message: string = '존재하지 않는 구간입니다.';

  constructor() {
    super(NotFoundSectionError.message);
  }
}
