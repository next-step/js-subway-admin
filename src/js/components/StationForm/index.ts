import Component from "@/core/component";
import { stationService } from "@/service";
import { $, newElement } from "@/utils/dom";

class StationForm extends Component {
  protected initDom(): void {
    this.$container = newElement(`<form class="form" id="station-form"/>`);
  }

  protected bindEvents(): void {
    this.rootEvent("submit", this.handleSubmit.bind(this));
  }

  private handleSubmit(): void {
    try {
      const name = $("#station-name", this.$container) as HTMLInputElement;
      stationService.add(name.value);
      name.value = "";
    } catch (error) {
      alert(error?.message);
    }
  }

  protected componentMount(): void {
    this.$container.innerHTML = `
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
    `;
  }
}

export default StationForm;
