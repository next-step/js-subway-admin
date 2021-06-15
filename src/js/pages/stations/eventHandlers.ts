import { $, $closest } from '../../utils/dom';
import { setData, getData } from '../../utils/storage';
import { render, renderSnackBar } from '../../utils/render';
import { createStationListsTemplates } from '../../templates/createTemplate';
import checkDuplicate from '../validate';
import { _filter, _some } from '../../utils/_';
import { LinesInfo } from '../../types/index';
import { Message } from '../../utils/constants';

const $modal = $('.modal');

const stationState = {
  stationName: ''
};

export const onAddStation = (e: Event): void => {
  e.preventDefault();

  const { value } = $('.stations-wrapper input') as HTMLInputElement;

  if (
    checkDuplicate(
      'stations',
      station => value === station,
      Message.DUPLICATE_STATION
    )
  )
    return;

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

  const { innerText } = $(
    '.station-name',
    $closest('.station-list-item', target)
  );

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

  if (
    checkDuplicate(
      'stations',
      station => value === station,
      Message.DUPLICATE_STATION
    )
  )
    return;

  const newStationsLists = [...getData('stations')];

  newStationsLists[newStationsLists.indexOf(stationState.stationName)] = value;
  setData('stations', newStationsLists);
  render(
    createStationListsTemplates(getData('stations')),
    $('.stations-wrapper ul')
  );
};

export const onClickDelete = (e: Event): void => {
  const target = e.target as HTMLElement;

  if (!target.matches('.station-list-item .delete-btn')) return;

  if (window.confirm(Message.DELETE_STATION_CONFIRM)) {
    const { innerText } = $(
      '.station-name',
      $closest('.station-list-item', target)
    );
    if (
      _some(getData<LinesInfo>('lines'), (line: LinesInfo) => {
        const { upLine, downLine } = line;

        return innerText === upLine || innerText === downLine;
      })
    ) {
      renderSnackBar(Message.CANNOT_DELETE_REGISTERED_STATION);
    } else {
      setData(
        'stations',
        _filter(getData('stations'), station => station !== innerText)
      );
      render(
        createStationListsTemplates(getData('stations')),
        $('.stations-wrapper ul')
      );
      renderSnackBar(Message.DELETE_STATION);
    }
  }
};
