import Component from "@/core/component";
import { StationUpdate } from "@/components";
import { stationService, uiService } from "@/service";
import { stationStore } from "@/store";
import { newElement, closest } from "@/utils/dom";

class StationList extends Component {
  stationUpdate = new StationUpdate();

  protected initDom(): void {
    `<ul id="station-list"/>`;
    this.$container = newElement(`<ul id="station-list"/>`);
  }

  protected bindEvents(): void {
    this.rootEvent("click", this.hanldeClick.bind(this));
  }

  private hanldeClick(e: Event): void {
    try {
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
    } catch (error) {
      alert(error?.message);
    }
  }

  protected componentMount(): void {
    const { stations } = stationStore.getState();
    this.$container.innerHTML =
      stations.length > 0
        ? `
    ${stations
      .map(
        ({ id, name }) => `
    <li class="station-list-item d-flex items-center py-2" data-id=${id} data-name=${name}>
      <span class="w-100 pl-2">${name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1"
        id="update"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm"
        id="remove"
      >
        삭제
      </button>
  </li>
    `
      )
      .join("")}
    `
        : "아직 등록된 역이 없습니다.";
  }
}

export default StationList;
