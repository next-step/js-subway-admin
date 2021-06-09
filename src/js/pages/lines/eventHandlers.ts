import { $, $$ } from '../../utils/dom';
import { _filter, _map, _reduce, _each } from '../../utils/_';
import { StringKeyObject, LinesInfo } from '../../types/index';
import { setData, getData } from '../../utils/storage';
import { render } from '../../utils/render';
import { createLinesListsTemplates } from '../../templates/createTemplate';
import checkDuplicate from '../validate';
import { Message } from '../../utils/constants';

const $modal = $('.modal');

export const onModalOpen = (): void => {
  $modal.classList.add('open');
};

export const onModalClose = (): void => {
  $modal.classList.remove('open');
};

export const onSubmitAddLine = (e: Event): void => {
  e.preventDefault();

  const target = e.target as HTMLFormElement;
  const linesInfoKeys = ['name', 'upLine', 'downLine', 'dist', 'time', 'color'];
  const linesInfo = _reduce<string, StringKeyObject<string | number>>(
    _map(
      _filter<HTMLElement, HTMLFormControlsCollection>(
        target.elements,
        element => element.nodeName === 'INPUT' || element.nodeName === 'SELECT'
      ),
      element => (<HTMLInputElement | HTMLSelectElement>element).value
    ),
    (acc, val, i) => {
      const key = linesInfoKeys[i];
      acc[key] = val;
    },
    {}
  );

  if (
    checkDuplicate(
      'lines',
      info => {
        const { name } = info as LinesInfo;

        return name === linesInfo.name;
      },
      Message.DUPLICATE_LINE
    )
  )
    return;
  setData('lines', [...getData('lines'), linesInfo]);
  render(createLinesListsTemplates(getData('lines')), $('.lines-wrapper ul'));
};

export const onPickColor = (e: Event): void => {
  const target = e.target as HTMLElement;

  _each($$('.color-option'), (element: HTMLButtonElement) => {
    element.classList.remove('border-selected-color');
  });

  if (!target.matches('.color-option')) return;

  const $colorInput = $('.subway-line-color') as HTMLInputElement;

  // eslint-disable-next-line prefer-destructuring
  $colorInput.value = target.classList[1];

  target.classList.add('border-selected-color');
};
