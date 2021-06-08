const StationListItem = ({ stationName }) => {
  const $stationListItem = document.createElement('li');
  $stationListItem.className = 'station-list-item d-flex items-center py-2';

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

const StationList = () => {
  const $stationList = document.createElement('ul');
  $stationList.className = 'mt-3 pl-0';

  // 추후 상태를 받아 반복 실행시켜 줄 예정, li사이에 hr을 border-bottom으로 교체해야함
  $stationList.appendChild(StationListItem({ stationName: '사당' }));
  $stationList.appendChild(StationListItem({ stationName: '방배' }));

  return $stationList;
};

export default StationList;
