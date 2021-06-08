const StationListItem = ({ id, stationName }) => {
  const $stationListItem = document.createElement('li');
  $stationListItem.className = 'station-list-item d-flex items-center py-2';
  $stationListItem.id = id;

  const $stationName = document.createElement('span');
  $stationName.className = 'w-100 pl-2';
  $stationName.textContent = stationName;

  const $editButton = document.createElement('button');
  $editButton.type = 'button';
  $editButton.className = 'bg-gray-50 text-gray-500 text-sm mr-1';
  $editButton.textContent = '수정';

  const $deleteButton = document.createElement('button');
  $deleteButton.type = 'button';
  $deleteButton.className = 'bg-gray-50 text-gray-500 text-sm';
  $deleteButton.textContent = '삭제';

  $stationListItem.append($stationName, $editButton, $deleteButton);

  return $stationListItem;
};

const StationList = ({ stations = [] }) => {
  const $stationList = document.createElement('ul');
  $stationList.className = 'mt-3 pl-0';

  // 추후 상태를 받아 반복 실행시켜 줄 예정, li사이에 hr을 border-bottom으로 교체해야함
  stations.forEach(({ id, stationName }) => {
    $stationList.appendChild(StationListItem({ id, stationName }));
  });

  return $stationList;
};

export default StationList;
