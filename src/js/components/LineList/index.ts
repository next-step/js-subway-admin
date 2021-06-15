import Component from "@/core/component";
import { lineDB } from "@/data";
import { LineUpdate } from "@/components";
import { lineService, uiService } from "@/service";
import { lineStore } from "@/store";
import { newElement, closest } from "@/utils/dom";

class LineList extends Component {
  lineUpdate = new LineUpdate();

  protected initDom(): void {
    this.$container = newElement(`<ul class="mt-3 pl-0"/>`);
  }

  protected bindEvents(): void {
    this.rootEvent("click", this.hanldeClick.bind(this));
  }

  private hanldeClick({ target }): void {
    try {
      const id = target.id;
      if (id !== "update" && id !== "remove") return;
      const lineId = closest(target, "li").dataset.id;
      const actions = {
        update: () => {
          const lineInfo = lineDB.get(lineId);
          this.lineUpdate.updateProps(lineInfo);
          uiService.openModal(this.lineUpdate, "노선 정보 수정하기");
        },
        remove: () => lineService.remove(lineId),
      };
      actions[id]();
    } catch (error) {
      alert(error?.message);
    }
  }

  protected render(): void {
    const { lines } = lineStore.getState();
    this.$container.innerHTML =
      lines.length > 0
        ? `${lines
            .map(
              ({
                color,
                name,
                id,
              }) => `<li class="d-flex items-center py-2 relative" data-id=${id}>
        <span class="subway-line-color-dot bg-${color}"></span>
        <span class="w-100 pl-6 subway-line-list-item-name ${color}"
          >${name}</span
        >
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
        </li>`
            )
            .join("")}<hr class="my-0" />`
        : "아직 등록된 노선이 없습니다.";
  }
}

export default LineList;
