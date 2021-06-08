import { $ } from '../utils/dom';
import { addData, getData } from '../utils/storage';
import { createStationsItemTemplate } from '../utils/template';
import render from '../utils/render';
import initValue from '../utils/init';
import { include } from '../libs/index';

const validateValue = (value: string): boolean => {
  if (!include(getData('stations'), value) && value.match(/^[가-힣]{2,20}$/))
    return true;
  return false;
};

const onAddStation = (e: Event): void => {
  e.preventDefault();

  const $input = $('.stations-container form .input-field') as HTMLInputElement;
  const { value } = $input;

  if (!validateValue(value)) {
    alert('형식에 맞지 않거나 중복된 이름입니다.');
    return;
  }

  addData('stations', value);
  render($('.stations-container .stations-list'))(
    createStationsItemTemplate(getData('stations'))
  );
  initValue($input);
};

export default onAddStation;
