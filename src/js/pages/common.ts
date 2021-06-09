import { $ } from '../utils/dom';

export const closeModal = (): void => {
  $('.modal').classList.remove('open');
};

export const validateValue = <Value>(
  value: Value,
  predicateList: ((value: Value) => boolean)[]
): boolean => {
  for (let i = 0; i < predicateList.length; i++) {
    if (!predicateList[i](value)) return false;
  }
  return true;
};
