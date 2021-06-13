import {HttpException} from "@/core";
import {HttpStatus} from "subway-constant";

export class ExistedStationException extends HttpException {

  public static readonly message: string = '똑같은 이름을 가진 역이 존재합니다.';

  constructor() {
    super(ExistedStationException.message, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundStationException extends HttpException {

  public static readonly message: string = '해당 역이 존재하지 않습니다.';

  constructor() {
    super(NotFoundStationException.message, HttpStatus.BAD_REQUEST);
  }
}

export class ContainsAtLineException extends HttpException {

  public static readonly message: string = '구간에 포함된 역은 삭제할 수 없습니다.';

  constructor() {
    super(NotFoundStationException.message, HttpStatus.BAD_REQUEST);
  }
}

export class EqualsStationException extends HttpException {

  public static readonly message: string = '상행역과 하행역이 동일합니다.';

  constructor() {
    super(EqualsStationException.message, HttpStatus.BAD_REQUEST);
  }
}
