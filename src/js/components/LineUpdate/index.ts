import Component from "@/core/component";
import { ILine } from "@/types";
import { createElement } from "@/utils/dom";

class LineUpdate extends Component<ILine> {
  protected initDom(): void {
    this.$container = createElement({
      tag: "form",
      id: "update-line",
    });
  }
}

export default LineUpdate;
