import {HttpStatus} from "subway-constant";
import {HttpException} from "@/core";

export class NotFoundUserException extends HttpException {

  public static readonly message: string = '아이디 또는 비밀번호가 일치하지 않습니다.';

  constructor() {
    super(NotFoundUserException.message, HttpStatus.BAD_REQUEST);
  }
}

export class ExistUserException extends HttpException {

  public static readonly message: string = '이미 존재하는 사용자입니다.';

  constructor() {
    super(ExistUserException.message, HttpStatus.BAD_REQUEST);
  }
}