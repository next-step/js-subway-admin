const SectionListItem = ({ stationName }) => {
  const $sectionListItem = document.createElement('li');
  $sectionListItem.className = 'd-flex items-center py-2 relative';

  const $stationName = document.createElement('span');
  $stationName.className = 'w-100 pl-6';
  $stationName.textContent = stationName;

  const $editButton = document.createElement('button');
  $editButton.type = 'button';
  $editButton.className = 'bg-gray-50 text-gray-500 text-sm mr-1';
  $editButton.textContent = '수정';

  const $deleteButton = document.createElement('button');
  $deleteButton.type = 'button';
  $deleteButton.className = 'bg-gray-50 text-gray-500 text-sm';
  $deleteButton.textContent = '삭제';

  $sectionListItem.appendChild($stationName);
  $sectionListItem.appendChild($editButton);
  $sectionListItem.appendChild($deleteButton);

  return $sectionListItem;
};

const SectionList = () => {
  const $sectionList = document.createElement('ul');
  $sectionList.className = 't-3 pl-0';

  // 추후 상태를 보고 반복해서 넣어 줄 계획, item에는 hr대신 border-bottom을 넣어 줄 예정
  $sectionList.appendChild(SectionListItem({ stationName: '인천' }));

  return $sectionList;
};

export default SectionList;
