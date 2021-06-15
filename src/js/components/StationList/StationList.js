/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import ajax from 'js/api';
import { ModifyStationModal } from '..';

const StationListItem = ({ id, stationName, stations, setStations, modalState, setModalState }) => {
  const onshowModalHandler = () => setModalState({ id, prevStationName: stationName, isModalOpen: true });

  const onDeleteStationHandler = ({ target }) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setStations(stations.filter(station => station.id !== +target.id));
      ajax.deleteStation(target.id);
    }
  };

  const $stationListItem = document.createElement('li');
  $stationListItem.className = 'station-list-item d-flex items-center py-2';
  if (modalState.isModalOpen) {
    $stationListItem.appendChild(ModifyStationModal({ modalState, setModalState, stations, setStations }));
  }

  const $stationName = document.createElement('span');
  $stationName.className = 'w-100 pl-2';
  $stationName.textContent = stationName;

  const $editButton = document.createElement('button');
  $editButton.type = 'button';
  $editButton.className = 'bg-gray-50 text-gray-500 text-sm mr-1';
  $editButton.textContent = '수정';
  $editButton.addEventListener('click', onshowModalHandler);

  const $deleteButton = document.createElement('button');
  $deleteButton.type = 'button';
  $deleteButton.className = 'bg-gray-50 text-gray-500 text-sm';
  $deleteButton.textContent = '삭제';
  $deleteButton.id = id;
  $deleteButton.addEventListener('click', onDeleteStationHandler);

  $stationListItem.append($stationName, $editButton, $deleteButton);

  return $stationListItem;
};

const StationList = ({ stations = [], setStations, modalState, setModalState }) => {
  const $stationList = document.createElement('ul');
  $stationList.className = 'mt-3 pl-0';

  // 추후 상태를 받아 반복 실행시켜 줄 예정, li사이에 hr을 border-bottom으로 교체해야함
  stations.forEach(({ id, stationName }) => {
    $stationList.appendChild(
      StationListItem({ id, stationName, stations, setStations, modalState, setModalState })
    );
  });

  return $stationList;
};

export default StationList;
