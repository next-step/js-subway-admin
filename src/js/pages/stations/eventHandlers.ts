import $ from '../../utils/dom';
import { setData, getData } from '../../utils/storage';
import { render } from '../../utils/render';
import { createStationListsTemplates } from '../../templates/createTemplate';
import checkDuplicateStation from './validate';

const $modal = $('.modal');

const stationState = {
  stationName: ''
};

export const onAddStation = (e: Event): void => {
  e.preventDefault();

  const { value } = $('.stations-wrapper input') as HTMLInputElement;

  if (checkDuplicateStation(value)) return;

  setData('stations', [...getData('stations'), value]);
  render(
    createStationListsTemplates(getData('stations')),
    $('.stations-wrapper ul')
  );
};

export const onClickEditModalOpen = (e: Event): void => {
  const target = e.target as HTMLElement;

  if (!target.matches('.station-list-item .modal-trigger-btn')) return;
  const $editInput = $('#station-name-edit') as HTMLInputElement;

  const { innerText } = target.previousElementSibling as HTMLSpanElement;

  stationState.stationName = innerText;
  $editInput.value = innerText;
  $modal.classList.add('open');
};

export const onClickEditModalClose = (): void => {
  $modal.classList.remove('open');
};

export const onEdit = (e: Event): void => {
  e.preventDefault();

  const $editInput = $('#station-name-edit') as HTMLInputElement;
  const { value } = $editInput;

  if (checkDuplicateStation(value)) return;

  const newStationsLists = [...getData('stations')];

  newStationsLists[newStationsLists.indexOf(stationState.stationName)] = value;
  setData('stations', newStationsLists);
  render(
    createStationListsTemplates(getData('stations')),
    $('.stations-wrapper ul')
  );
};
