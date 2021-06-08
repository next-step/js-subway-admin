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
  const list =
    datas.length > 0
      ? datas.map((data) => station(data.id, data.name)).join("")
      : "아직 등록된 역이 없습니다.";
  return `
    <div class="heading">
    <h2 class="mt-1">🚉 역 관리</h2>
    </div>
    <form id="station-form">
    <div class="d-flex w-100">
      <label for="station-name" class="input-label" hidden>
        역 이름
      </label>
      <input
        type="text"
        id="station-name"
        name="stationName"
        class="input-field"
        placeholder="역 이름"
        required
      />
      <button
        name="submit"
        class="input-submit bg-cyan-300 ml-2"
      >
        확인
      </button>
    </div>
  </form>
    <ul>
    ${list}
    </ul>
    `;
};

export default view;
