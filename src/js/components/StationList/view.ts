interface IStations {
  id: string;
  name: string;
}

const station = (id: string, name: string) => {
  return `
      <li class="station-list-item d-flex items-center py-2" data-id=${id}>
      <span class="w-100 pl-2">${name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm"
      >
        삭제
      </button>
    </li>
      `;
};

const view = (datas: IStations[]): string => {
  return datas.length > 0
    ? datas.map((data) => station(data.id, data.name)).join("")
    : "아직 등록된 역이 없습니다.";
};

export default view;
