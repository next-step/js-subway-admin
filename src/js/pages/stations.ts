import {
  closeModal,
  getTargetItemName,
  removeItem,
  validateValue
} from './common';
import { $ } from '../utils/dom';
import { findIndex, include } from '../libs/index';
import { Message, LinesFormData } from '../types/index';
import { createStationsItemTemplate } from '../utils/template';
import { addData, getData, replaceData } from '../utils/storage';
import render from '../utils/render';
import setState from '../utils/state';
import initValue from '../utils/init';
import bindEvents from '../utils/bindEvents';
import stationsEditModal from '../templates/stationsEditModal';

const stationsState = {
  prevValue: ''
};

const isIncludedInLines = (target: string) => {
  if (
    include<LinesFormData>(
      getData('lines'),
      data =>
        (data as LinesFormData).upLineStation === target ||
        (data as LinesFormData).downLineStation === target
    )
  ) {
    alert(Message.CANNOT_REMOVE_STATION);
    return true;
  }
  return false;
};

export const onAddStation = (e: Event): void => {
  e.preventDefault();

  const $input = $('.stations-container form .input-field') as HTMLInputElement;
  const { value } = $input;

  if (
    !validateValue(value, [
      value => /^[가-힣]{2,20}$/.test(value),
      value => !include(getData('stations'), item => item === value)
    ])
  ) {
    alert(Message.INVALID_VALUE);
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

  if (
    !validateValue(value, [
      value => /^[가-힣]{2,20}$/.test(value),
      value => !include(getData('stations'), item => item === value)
    ])
  ) {
    alert(Message.INVALID_VALUE);
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
  setState(
    stationsState,
    'prevValue',
    getTargetItemName('.station-name', target)
  );
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

export const onRemoveStation = removeItem<string>(
  'stations',
  '.stations-container .stations-list',
  '.station-name',
  createStationsItemTemplate,
  target => data => data !== target,
  isIncludedInLines
);
