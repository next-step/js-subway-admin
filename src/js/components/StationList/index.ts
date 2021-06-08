import Component from "@/core/component";
import view from "./view";
import { stationStore } from "@/store";
import { $, createElement } from "@/utils/dom";

class StationList extends Component {
  protected componentMount(): void {
    const { stations } = stationStore.getState();
    this.$container.innerHTML = view(stations);
  }

  public bindEvents(): void {
    // 수정 삭제
  }

  public render(): void {
    this.$container = createElement({
      tag: "ul",
      id: "station-list",
    });
    this.$root.appendChild(this.$container);
    this.componentMount();
    this.bindEvents();
  }
}

export default StationList;
