import { _some } from '../utils/_';
import { getData } from '../utils/storage';
import { renderSnackBar } from '../utils/render';
import { LocalStorageKey, LinesInfo } from '../types/index';

const checkDuplicate = (
  data: LocalStorageKey,
  find: (item: string | LinesInfo) => boolean,
  msg: string
): boolean => {
  if (_some(getData<string | LinesInfo>(data), find)) {
    renderSnackBar(msg);
    return true;
  }
  return false;
};

export default checkDuplicate;
