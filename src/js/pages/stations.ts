import { include } from '../libs/index';
import { $, $closest } from '../utils/dom';
import { addData, getData } from '../utils/storage';
import { createStationsItemTemplate } from '../utils/template';
import render from '../utils/render';
import initValue from '../utils/init';
import stationsEditModal from '../templates/stationsEditModal';

let prevValue = '';

const validateValue = (value: string): boolean => {
  if (
    !include<string>(getData<string>('stations'), item => item === value) &&
    value.match(/^[가-힣]{2,20}$/)
  )
    return true;
  return false;
};

const getTargetStation = (node: HTMLElement): string => {
  const targetNode = $closest('li', node).firstElementChild as HTMLElement;
  return targetNode.innerHTML;
};

export const onAddStation = (e: Event): void => {
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

export const onShowEditModal = (e: Event): void => {
  const target = e.target as HTMLElement;

  if (!include(target.classList, item => item === 'edit-btn')) return;

  const $modal = $('.modal');
  $modal.classList.add('open');
  render($modal)(stationsEditModal);
  prevValue = getTargetStation(target);
};
