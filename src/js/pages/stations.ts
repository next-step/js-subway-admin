import { $, $closest } from '../utils/dom';
import { findIndex, include } from '../libs/index';
import { createStationsItemTemplate } from '../utils/template';
import { addData, getData, removeData, replaceData } from '../utils/storage';
import render from '../utils/render';
import setState from '../utils/state';
import initValue from '../utils/init';
import closeModal from './common';
import bindEvents from '../utils/bindEvents';
import stationsEditModal from '../templates/stationsEditModal';

const stationsState = {
  prevValue: ''
};

const validateValue = (value: string): boolean => {
  if (
    !include<string>(getData<string>('stations'), item => item === value) &&
    value.match(/^[가-힣]{2,20}$/)
  )
    return true;
  return false;
};

const getTargetStation = (node: HTMLElement): string =>
  $('.station-name', $closest('li', node)).innerHTML;

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

export const onEditStation = (e: Event): void => {
  e.preventDefault();

  const $input = $('.modal form .input-field') as HTMLInputElement;
  const { value } = $input;

  if (!validateValue(value)) {
    alert('형식에 맞지 않거나 중복된 이름입니다.');
    return;
  }

  replaceData(
    'stations',
    value,
    findIndex(getData('stations'), item => item === stationsState.prevValue)
  );
  render($('.stations-container .stations-list'))(
    createStationsItemTemplate(getData('stations'))
  );
  initValue($input);
  setState(stationsState, 'prevValue', '');
  closeModal();
};

export const onShowEditModal = (e: Event): void => {
  const target = e.target as HTMLElement;

  if (!include(target.classList, item => item === 'edit-btn')) return;

  const $modal = $('.modal');

  $modal.classList.add('open');

  render($modal)(stationsEditModal);
  setState(stationsState, 'prevValue', getTargetStation(target));
  initValue(
    $('.modal form .input-field') as HTMLInputElement,
    stationsState.prevValue
  );
  bindEvents([
    {
      selector: '.modal-close',
      event: 'click',
      handlers: [() => closeModal()]
    },
    {
      selector: '.modal form',
      event: 'submit',
      handlers: [onEditStation]
    }
  ]);
};

export const onRemoveStation = (e: Event): void => {
  const target = e.target as HTMLElement;

  if (!include(target.classList, item => item === 'remove-btn')) return;
  if (!confirm('정말로 삭제하시겠습니까?')) return;

  removeData('stations', getTargetStation(target));
  render($('.stations-container .stations-list'))(
    createStationsItemTemplate(getData('stations'))
  );
};
