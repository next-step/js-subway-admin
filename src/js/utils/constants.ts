export enum PagesPath {
  HOME = '/',
  STATIONS = '/pages/stations',
  LINES = '/pages/lines',
  SECTIONS = '/pages/sections',
  LOGIN = '/pages/login',
  PAGENOTFOUND = '/page-not-found'
}

export enum Message {
  DELETE_CONFIRM = '정말로 해당 역을 삭제하시겠습니까?',
  CANNOT_DELETE_REGISTERED_STATION = '해당 역은 이미 노선에 등록되어있어서 삭제가 불가능합니다.',
  DELETE_STATION = '해당 역이 삭제되었습니다.',
  DUPLICATE_STATION = '중복된 역 이름입니다.',
  DUPLICATE_LINE = '중복된 노선 이름입니다.'
}
