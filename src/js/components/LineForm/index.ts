import Component from "@/core/component";
import view from "./view";
import { lineService } from "@/service";
import { stationStore } from "@/store";
import { $, createElement } from "@/utils/dom";

class LineForm extends Component {
  protected initDom(): void {
    this.$container = createElement({
      tag: "form",
      id: "create-line",
    });
  }

  protected bindEvents(): void {
    this.$container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const name = $("#name", this.$container) as HTMLInputElement;
      const upStation = $("#up", this.$container) as HTMLSelectElement;
      const downStation = $("#down", this.$container) as HTMLSelectElement;
      const color = $("#colors", this.$container) as HTMLInputElement;
      const distance = $("#distance", this.$container) as HTMLInputElement;
      const time = $("#time", this.$container) as HTMLInputElement;
      lineService.add(
        name.value,
        upStation?.value ?? "",
        downStation?.value ?? "",
        color.value,
        distance.value,
        time.value
      );
    });
  }

  protected componentMount(): void {
    const stations = stationStore.getAvailableStations();
    this.$container.innerHTML = view(stations);
  }
}

export default LineForm;
