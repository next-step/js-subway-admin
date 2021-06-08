import { $ } from '../utils/dom';
import { addData, getData } from '../utils/storage';
import { createStationsItemTemplate } from '../utils/template';
import render from '../utils/render';
import initValue from '../utils/init';

const onAddStation = (e: Event): void => {
  e.preventDefault();

  const $input = $('.stations-container form .input-field') as HTMLInputElement;

  addData('stations', $input.value);
  render($('.stations-container .stations-list'))(
    createStationsItemTemplate(getData('stations'))
  );
  initValue($input);
};

export default onAddStation;
