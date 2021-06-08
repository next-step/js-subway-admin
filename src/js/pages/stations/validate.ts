import { _some } from '../../utils/_';
import { getData } from '../../utils/storage';
import { renderSnackBar } from '../../utils/render';

const checkDuplicateStation = (value: string): boolean => {
  if (_some(getData('stations'), item => value === item)) {
    renderSnackBar('중복된 역 이름입니다.');
    return true;
  }
  return false;
};

export default checkDuplicateStation;
