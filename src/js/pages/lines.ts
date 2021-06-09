import render from '../utils/render';
import initValue from '../utils/init';
import bindEvents from '../utils/bindEvents';
import linesModalTemplate from '../templates/linesModal';
import { $, $$ } from '../utils/dom';
import { addData, getData } from '../utils/storage';
import { createLinesItemTemplate } from '../utils/template';
import { Message, ObjectStringKey } from '../types/index';
import { closeModal, validateValue } from './common';
import { each, filter, find, include, map, reduce, slice } from '../libs/index';

const onPickColor = (e: Event): void => {
  const target = e.target as HTMLButtonElement;

  if (target.tagName !== 'BUTTON') return;

  const targetColor = slice(
    find(target.classList, (item: string) => /^bg-/.test(item)) as string,
    3
  ) as string;
  initValue($('.subway-line-color-input') as HTMLInputElement, targetColor);

  each($$('.modal form .color-option'), element => {
    (element as HTMLButtonElement).classList.remove('selected-color-btn');
  });
  target.classList.add('selected-color-btn');
};

export const onAddLine = (e: Event): void => {
  e.preventDefault();

  const target = e.target as HTMLFormElement;
  const $lineNameInput = $('.modal form .line-name-input') as HTMLInputElement;
  const formItemsName = [
    'lineName',
    'upLineStation',
    'downLineStation',
    'distance',
    'time',
    'color'
  ];

  if (
    !validateValue($lineNameInput.value, [
      value => /^[1-9가-힣]{2,10}$/.test(value),
      value => !include(getData('lines'), item => item === value)
    ])
  ) {
    alert(Message.INVALID_VALUE);
    return;
  }

  addData(
    'lines',
    reduce<ObjectStringKey<number | string>, string>(
      map(
        filter<HTMLElement, HTMLFormControlsCollection>(
          target.elements,
          element => element.tagName === 'INPUT' || element.tagName === 'SELECT'
        ),
        element => (element as HTMLInputElement | HTMLSelectElement).value
      ),
      {},
      (acc, item, index) => {
        acc[formItemsName[index as number]] = item;
      }
    )
  );
  render($('.lines-container .lines-list'))(
    createLinesItemTemplate(getData('lines'))
  );
  closeModal();
};

export const onShowModal = (): void => {
  const $modal = $('.modal');
  $modal.classList.add('open');
  render($modal)(linesModalTemplate);
  bindEvents([
    {
      selector: '.modal form',
      event: 'submit',
      handlers: [onAddLine]
    },
    {
      selector: '.modal-close',
      event: 'click',
      handlers: [() => closeModal()]
    },
    {
      selector: '.modal .subway-line-color-selector',
      event: 'click',
      handlers: [onPickColor]
    }
  ]);
};
