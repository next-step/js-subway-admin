import Component from "@/core/component";
import router from "@/router";
import { LineForm, LineList } from "@/components";
import { IPageInfo } from "@/types";
import { newElement } from "@/utils/dom";
import { uiService } from "@/service";
import { authStore, lineStore } from "@/store";
import { PATH, MESSAGE, PAGE_TITLE } from "@/constants";

class Lines extends Component {
  private lineForm = new LineForm();
  protected initDom(): void {
    this.$container = newElement(`<div class="wrapper p-10 bg-white"/>`);
  }

  protected initChildren(): void {
    const lineList = new LineList();
    lineStore.addObserver(lineList);
    this.children = [lineList];
  }

  protected bindEvents(): void {
    this.rootEvent("click", this.handleClick.bind(this));
  }

  private handleClick({ target }): void {
    try {
      const id = target.id;
      if (id !== "add-line") return;
      uiService.openModal(this.lineForm, "노선 등록하기");
    } catch (error) {
      alert(error.message);
    }
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

  protected componentMount(): void {
    this.$container.innerHTML = `
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
      <button
      type="button"
      id="add-line"
      class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2"
      >
      추가
      </button>
  </div>
`;
  }
}

export default Lines;
