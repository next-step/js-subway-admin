import { AddStationForm, Heading, StationList } from 'js/components';

const Stations = () => {
  const $stations = document.createElement('div');
  $stations.className = 'wrapper bg-white p-10';

  const $headingContainer = document.createElement('heading');
  $headingContainer.className = 'heading';
  $headingContainer.appendChild(Heading({ level: 2, className: 'mt-1', children: '🚉 역 관리' }));

  $stations.appendChild($headingContainer);
  $stations.appendChild(AddStationForm());

  $stations.appendChild(StationList());

  return $stations;
};

export default Stations;
