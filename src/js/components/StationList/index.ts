import Component from "@/core/component";
import view from "./view";
import stationService from "@/service/stationService";
import { stationStore } from "@/store";
import { $, createElement, closest } from "@/utils/dom";

class StationList extends Component {
  protected initDom(): void {
    this.$container = createElement({
      tag: "ul",
      id: "station-list",
    });
  }
  protected componentMount(): void {
    const { stations } = stationStore.getState();
    this.$container.innerHTML = view(stations);
  }

  protected bindEvents(): void {
    this.$container.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      const type = target.id;
      if (type !== "update" && type !== "remove") return;
      const stationId = closest(target, "li").dataset.id;
      const actions = {
        update: () => {},
        remove: () => {
          stationService.remove(stationId);
          return;
        },
      };
      actions[type]();
    });
  }

  public render(): void {
    this.$root.appendChild(this.$container);
    this.componentMount();
    this.bindEvents();
  }
}

export default StationList;
