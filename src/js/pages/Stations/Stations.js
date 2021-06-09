import ajax from 'js/api';
import { AddStationForm, Heading, StationList } from 'js/components';
import render from 'js/utils/render';

const Stations = (async () => {
  let stations = await ajax.getStations();
  const setStations = newStations => {
    stations = newStations;
    render();
  };

  let modalState = { id: null, isModalOpen: false, prevStationName: '' };
  const setModalState = nextModalState => {
    modalState = nextModalState;
    render();
  };
  return () => {
    const $stations = document.createElement('div');
    $stations.className = 'wrapper bg-white p-10';

    const $headingContainer = document.createElement('heading');
    $headingContainer.className = 'heading';
    $headingContainer.appendChild(Heading({ level: 2, className: 'mt-1', children: '🚉 역 관리' }));

    $stations.appendChild($headingContainer);
    $stations.appendChild(AddStationForm({ stations, setStations }));

    $stations.appendChild(StationList({ stations, setStations, modalState, setModalState }));

    return $stations;
  };
})();

export default Stations;
