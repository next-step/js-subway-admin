import { colorOptions } from "@/utils/mock";

interface IStation {
  id: string;
  name: string;
}

const stationSelect = (stations: IStation[], id: string) => {
  return `
    <select id=${id} name=${id}>
        ${stations
          .map(
            (station) => `<option value=${station.id}>${station.name}</option>`
          )
          .join("")}
    </select>
    `;
};

const colorSelect = `
   <select id="colors" name="colors">
        ${colorOptions
          .map(
            (color) =>
              `<option value=${color} class="color-option">${color}</option>`
          )
          .join("")}
   </select>
`;

const view = (stations: IStation[]): string => {
  return `
        <div class="input-control">
            <label for="name" class="input-label" hidden>노선 이름</label>
            <input type="text"  class="input-field" id="name" name="name" minlength="2" maxlength="10" placeholder="노선 이름" required>
        </div>
        <div class="input-control flex-col">
            <label for="up" class="input-label font-bold">🚎상행역</label>
            ${
              stations.length > 0
                ? stationSelect(stations, "up")
                : "등록 가능한 역이 없습니다"
            }
        </div>
        <div class="input-control flex-col">
            <label for="down" class="input-label font-bold">🚎하행역</label>
            ${
              stations.length > 0
                ? stationSelect(stations, "down")
                : "등록 가능한 역이 없습니다"
            }
        </div>
        <div class="input-control flex-col">
            <label for="colors" class="input-label font-bold">➰색상</label>
            ${colorSelect}
        </div>
        <div class="input-control">
            <label for="distance" class="input-label" hidden>거리</label>
            <input type="number"  class="input-field" id="distance" name="time" min="1" placeholder="거리(상행역과 하행역)" required>
        </div>
        <div class="input-control">
            <label for="time" class="input-label" hidden>시간</label>
            <input type="number"  class="input-field" id="time" name="time" min="0" placeholder="시간 (분 단위)" required>
        </div>
        <button
          name="submit"
          class="input-submit w-100 bg-cyan-300"
        >
          등록
        </button>
    `;
};

export default view;
