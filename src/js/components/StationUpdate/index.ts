import Component from "@/core/component";
import { stationService } from "@/service";
import { $, newElement } from "@/utils/dom";

interface IProps {
  id: string;
  value: string;
}

class StationUpdate extends Component<IProps> {
  protected initDom(): void {
    this.$container = newElement(`<form id="update-station"/>`);
  }

  protected bindEvents(): void {
    this.rootEvent("submit", this.handleSubmit.bind(this));
  }

  private handleSubmit(): void {
    const input = $("#station-name", this.$container) as HTMLInputElement;
    const newName = input.value;
    if (newName === this.props?.value) return;
    stationService.update(this.props?.id, newName);
  }

  protected componentMount(): void {
    if (this.props)
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
        value=${this.props.value}
        required
      />
      <button
        name="submit"
        class="input-submit bg-cyan-300 ml-2"
      >
        수정
      </button>
    </div>
`;
  }
}

export default StationUpdate;
