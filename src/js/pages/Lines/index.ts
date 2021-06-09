import Component from "@/core/component";
import router from "@/router";
import view from "./view";
import { LineForm, LineList } from "@/components";
import { IPageInfo } from "@/types";
import { createElement } from "@/utils/dom";
import { uiService } from "@/service";
import { authStore, lineStore } from "@/store";
import { PATH, MESSAGE, PAGE_TITLE } from "@/constants";

class Lines extends Component {
  lineForm = new LineForm();
  protected initDom(): void {
    this.$container = createElement({
      tag: "div",
      className: "wrapper p-10 bg-white",
    });
  }

  protected initChildren(): void {
    const lineList = new LineList();
    lineStore.addObserver(lineList);
    this.children = [lineList];
  }

  protected bindEvents(): void {
    this.$container.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      const id = target.id;
      if (id !== "add-line") return;
      uiService.openModal(this.lineForm, "노선 등록하기");
    });
  }

  protected componentMount(): void {
    this.$container.innerHTML = view;
  }

  protected beforeChangeURL(): boolean {
    const { isLoggedIn } = authStore.getState();
    if (isLoggedIn) return true;
    alert(MESSAGE.LOGIN_REQUIRED);
    router.push(PATH.LOGIN);
    return false;
  }

  public pageInfo(): IPageInfo {
    if (!this.beforeChangeURL()) return;
    return {
      title: PAGE_TITLE.LINES,
      href: PATH.LINE,
    };
  }
}

export default Lines;
