import Component from "@/core/component";
import view from "./view";
import { StationUpdate } from "@/components";
import { stationService, uiService } from "@/service";
import { stationStore } from "@/store";
import { $, createElement, closest } from "@/utils/dom";

class StationList extends Component {
  stationUpdate = new StationUpdate();

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
      const { id, name } = closest(target, "li").dataset;
      const actions = {
        update: () => {
          this.stationUpdate.updateProps({ id, value: name });
          uiService.openModal(this.stationUpdate, "역 이름 수정하기");
          return;
        },
        remove: () => {
          stationService.remove(id);
          return;
        },
      };
      actions[type]();
    });
  }
}

export default StationList;
