import render from '../utils/render';
import { $ } from '../utils/dom';
import { addData, getData } from '../utils/storage';
import { createStationsItemTemplate } from '../utils/template';

const onAddStation = (e: Event): void => {
  e.preventDefault();

  const { value } = $(
    '.stations-container form .input-field'
  ) as HTMLInputElement;

  addData('stations', value);
  render($('.stations-container .stations-list'))(
    createStationsItemTemplate(getData('stations'))
  );
};

$('.stations-container form').addEventListener('submit', onAddStation);
