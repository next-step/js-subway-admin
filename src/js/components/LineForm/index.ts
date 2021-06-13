import Component from "@/core/component";
import { ILineData, LineEnum } from "@/types";
import { colorOptions } from "@/utils/mock";
import { lineService } from "@/service";
import { stationStore } from "@/store";
import { newElement, formData } from "@/utils/dom";

class LineForm extends Component {
  protected initDom(): void {
    this.$container = newElement(`<form id="create-line"/>`);
  }

  protected bindEvents(): void {
    this.rootEvent("submit", this.handleSubmit.bind(this));
  }

  private handleSubmit(): void {
    try {
      const lineDatas = formData<ILineData>(this.$container, LineEnum);
      lineService.add(lineDatas);
    } catch (error) {
      alert(error.message);
    }
  }

  protected componentMount(): void {
    const stations = stationStore.getAvailableStations();
    this.$container.innerHTML = this.$container.innerHTML = `
    <div class="input-control">
        <label for="name" class="input-label" hidden>노선 이름</label>
        <input type="text" class="input-field" id="name" name="name" minlength="2" 
        maxlength="10" placeholder="노선 이름" required value=${name} >
    </div>
    <div class="input-control flex-col">
        <label for="up" class="input-label font-bold">🚎상행역</label>
        ${
          stations.length > 0
            ? `
            <select id="up" name="up">
                ${stations
                  .map(
                    (station) =>
                      `<option value=${station.id}>${station.name}</option>`
                  )
                  .join("")}
            </select>
            `
            : "등록 가능한 역이 없습니다"
        }
    </div>
    <div class="input-control flex-col">
        <label for="down" class="input-label font-bold">🚎하행역</label>
        ${
          stations.length > 0
            ? `
            <select id="down" name="down">
                ${stations
                  .map(
                    (station) =>
                      `<option value=${station.id}>${station.name}</option>`
                  )
                  .join("")}
            </select>
            `
            : "등록 가능한 역이 없습니다"
        }
    </div>
    <div class="input-control flex-col">
        <label for="colors" class="input-label font-bold">➰색상</label>
        <select id="colors" name="colors">
        ${colorOptions
          .map(
            (option) =>
              `<option value=${option} class="color-option">${option}</option>`
          )
          .join("")}
   </select>
    </div>
    <div class="input-control">
        <label for="distance" class="input-label" hidden>거리</label>
        <input type="number"  class="input-field" id="distance" 
        name="time" min="1" placeholder="거리(상행역과 하행역)" required>
    </div>
    <div class="input-control">
        <label for="time" class="input-label" hidden>시간</label>
        <input type="number"  class="input-field" id="time" 
        name="time" min="0" placeholder="시간 (분 단위)" required>
    </div>
    <button
      name="submit"
      class="input-submit w-100 bg-cyan-300"
    >
      등록
    </button>
`;
  }
}

export default LineForm;
