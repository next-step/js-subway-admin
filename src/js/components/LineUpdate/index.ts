import Component from "@/core/component";
import view from "@/components/LineForm/view";
import { ILine } from "@/types";
import { stationStore } from "@/store";
import { lineService } from "@/service";
import { createElement } from "@/utils/dom";
import { $ } from "@/utils/dom";

class LineUpdate extends Component<ILine> {
  protected initDom(): void {
    this.$container = createElement({
      tag: "form",
      id: "update-line",
    });
  }

  protected bindEvents(): void {
    this.$container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const { value: name } = $("#name", this.$container) as HTMLInputElement;
      const { value: upStation } = $(
        "#up",
        this.$container
      ) as HTMLSelectElement;
      const { value: downStation } = $(
        "#down",
        this.$container
      ) as HTMLSelectElement;
      const { value: color } = $(
        "#colors",
        this.$container
      ) as HTMLInputElement;
      const { value: distance } = $(
        "#distance",
        this.$container
      ) as HTMLInputElement;
      const { value: time } = $("#time", this.$container) as HTMLInputElement;
      lineService.update(
        {
          id: this.props.id,
          name,
          upStation,
          downStation,
          color,
          distance,
          time,
        },
        this.props
      );
    });
  }

  protected componentMount(): void {
    if (this.props) {
      const stations = stationStore.getAvailableStations();
      this.$container.innerHTML = view(stations, this.props);
    }
  }
}

export default LineUpdate;
