import ajax from 'js/api';
import { AddStationForm, Heading, StationList } from 'js/components';
import routeHandler from 'js/utils/routeHandler';

const Stations = (async () => {
  let stations = await ajax.getStations();
  const setStations = newStations => {
    stations = newStations;
    // routeHandler가 render함수의 역할까지 같이하게된 것이 어색
    routeHandler();
  };
  return () => {
    const $stations = document.createElement('div');
    $stations.className = 'wrapper bg-white p-10';

    const $headingContainer = document.createElement('heading');
    $headingContainer.className = 'heading';
    $headingContainer.appendChild(Heading({ level: 2, className: 'mt-1', children: '🚉 역 관리' }));

    $stations.appendChild($headingContainer);
    $stations.appendChild(AddStationForm({ stations, setStations }));

    $stations.appendChild(StationList({ stations }));

    return $stations;
  };
})();

export default Stations;
