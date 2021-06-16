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

export class EqualsStationException extends HttpException {

  public static readonly message: string = '상행역과 하행역이 동일합니다.';

  constructor() {
    super(EqualsStationException.message, HttpStatus.BAD_REQUEST);
  }
}

export class ExistedSectionException extends HttpException {

  public static readonly message: string = '이미 등록된 구간입니다.';

  constructor() {
    super(ExistedSectionException.message, HttpStatus.BAD_REQUEST);
  }
}


export class DisconnectedStationException extends HttpException {

  public static readonly message: string = '상행역 또는 하행역에 연결된 구간이 없습니다.';

  constructor() {
    super(DisconnectedStationException.message, HttpStatus.BAD_REQUEST);
  }
}


export class NotFoundUpStationException extends HttpException {

  public static readonly message: string = '연결된 상행역이 없습니다.';

  constructor() {
    super(NotFoundUpStationException.message, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundDownStationException extends HttpException {

  public static readonly message: string = '연결된 하행역이 없습니다.';

  constructor() {
    super(NotFoundDownStationException.message, HttpStatus.BAD_REQUEST);
  }
}
