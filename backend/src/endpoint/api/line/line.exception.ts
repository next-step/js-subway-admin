import {HttpException} from "@/core";
import {HttpStatus} from "subway-constant";

export class ExistedLineException extends HttpException {

  public static readonly message: string = '이미 존재하는 노선입니다.';

  constructor() {
    super(ExistedLineException.message, HttpStatus.BAD_REQUEST);
  }

}


export class NotFoundLineException extends HttpException {

  public static readonly message: string = '해당 노선을 찾을 수 없습니다.';

  constructor() {
    super(NotFoundLineException.message, HttpStatus.BAD_REQUEST);
  }

}
