import Component from "@/core/component";
import { IPageInfo } from "@/types";
import { newElement } from "@/utils/dom";

class NotFound extends Component {
  protected initDom(): void {
    this.$container = newElement(`<div class="wrapper p-10 bg-white"/>`);
  }

  protected componentMount(): void {
    this.$container.innerHTML = `<h2>존재하지 않는 페이지입니다.</h2>`;
  }

  public pageInfo(): IPageInfo {
    return {
      title: "Not Found",
      href: "404",
    };
  }
}

export default NotFound;
