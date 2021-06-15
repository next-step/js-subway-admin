import subwayLineListItemCss from 'js/components/SubwayLineListItem/subwayLineListItem.module.css';

const { subwayLineColorDot } = subwayLineListItemCss;

const SubwayLineListItem = ({ dotColor, lineName }) => {
  const $subwayLineListItem = document.createElement('li');
  $subwayLineListItem.className = 'd-flex items-center py-2 relative';

  const $lineColorDot = document.createElement('span');
  $lineColorDot.className = `${subwayLineColorDot} ${dotColor}`;

  const $lineName = document.createElement('span');
  $lineName.className = 'w-100 pl-6 subway-line-list-item-name';
  $lineName.textContent = lineName;

  const $editButton = document.createElement('button');
  $editButton.type = 'button';
  $editButton.className = 'bg-gray-50 text-gray-500 text-sm mr-1';
  $editButton.textContent = '수정';

  const $deleteButton = document.createElement('button');
  $deleteButton.type = 'button';
  $deleteButton.className = 'bg-gray-50 text-gray-500 text-sm';
  $deleteButton.textContent = '삭제';

  $subwayLineListItem.appendChild($lineColorDot);
  $subwayLineListItem.appendChild($lineName);
  $subwayLineListItem.appendChild($editButton);
  $subwayLineListItem.appendChild($deleteButton);

  return $subwayLineListItem;
};

export default SubwayLineListItem;
