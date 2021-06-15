import { SubwayLineListItem } from 'js/components';

const SubwayLineList = () => {
  const $subwayLineList = document.createElement('ul');
  $subwayLineList.className = 'mt-3 pl-0';

  // 추후에 상태를 보고 map과 함께 뒤에 <hr class="my-0" /> 태그 대신 border-bottom을 추가해줍니다.
  $subwayLineList.appendChild(SubwayLineListItem({ dotColor: 'bg-blue-400', lineName: '1호선' }));

  return $subwayLineList;
};

export default SubwayLineList;
