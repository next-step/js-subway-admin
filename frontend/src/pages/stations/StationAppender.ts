import {Component} from "@/_core";

interface StationAppenderProps {
  addStation: (name: string) => void;
}

export class StationAppender extends Component<{}, StationAppenderProps> {
  protected template(): string {
    return `
      <form class="addForm">
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
          <button type="submit" class="input-submit bg-cyan-300 ml-2">
            확인
          </button>
        </div>
      </form>
    `;
  }

  protected setEvent() {
    this.addEvent('submit', '.addForm', (event: Event) => {
      event.preventDefault();
      const frm = event.target as HTMLFormElement;
      this.$props.addStation(frm.stationName.value);
    });
  }
}