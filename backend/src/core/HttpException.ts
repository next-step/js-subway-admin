import {HttpStatus} from "subway-constant";

export class HttpException {

  constructor(
    public readonly message: string = "알 수 없는 오류가 발생했습니다.",
    public readonly statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
  ) {}

}

export class UnauthorizedException extends HttpException {

  public static readonly message: string = '접근 권한이 없습니다.';

  constructor() {
    super(UnauthorizedException.message, HttpStatus.UNAUTHORIZED);
  }
}


export class ForbiddenException extends HttpException {

  public static readonly message: string = '유효한 토큰이 아닙니다.';

  constructor() {
    super(ForbiddenException.message, HttpStatus.FORBIDDEN);
  }
}
