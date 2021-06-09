import Component from "@/core/component";
import view from "./view";
import { lineDB } from "@/data";
import { LineUpdate } from "@/components";
import { lineService, uiService } from "@/service";
import { lineStore } from "@/store";
import { createElement, closest } from "@/utils/dom";

class LineList extends Component {
  lineUpdate = new LineUpdate();

  protected initDom(): void {
    this.$container = createElement({
      tag: "ul",
      className: "mt-3 pl-0",
    });
  }

  protected bindEvents(): void {
    this.$container.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
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
    });
  }

  protected componentMount(): void {
    const { lines } = lineStore.getState();
    this.$container.innerHTML = view(lines);
  }
}

export default LineList;
