import Component from "@/core/component";
import view from "./view";
import { lineStore } from "@/store";
import { createElement } from "@/utils/dom";

class LineList extends Component {
  protected initDom(): void {
    this.$container = createElement({
      tag: "ul",
      className: "mt-3 pl-0",
    });
  }

  protected bindEvents(): void {}

  protected componentMount(): void {
    const { lines } = lineStore.getState();
    this.$container.innerHTML = view(lines);
  }
}

export default LineList;
