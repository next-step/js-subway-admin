import Component from "@/core/component";
import view from "./view";
import { lineService } from "@/service";
import { lineStore } from "@/store";
import { createElement, closest } from "@/utils/dom";

class LineList extends Component {
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
      const name = closest(target, "li").dataset.id;
      const actions = {
        update: () => {},
        remove: () => lineService.remove(name),
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
