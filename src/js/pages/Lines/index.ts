import Component from "@/core/component";
import router from "@/router";
import { IPageInfo } from "@/types";
import { createElement } from "@/utils/dom";
import { authStore, stationStore } from "@/store";
import { PATH, MESSAGE, PAGE_TITLE } from "@/constants";

class Lines extends Component {
  protected initDom(): void {
    this.$container = createElement({
      tag: "div",
      className: "wrapper p-10 bg-white",
    });
  }

  protected componentMount(): void {
    this.$container.innerHTML = `  <div class="heading d-flex">
        <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
        <button
          type="button"
          class="btn create-line-btn modal-trigger-btn bg-cyan-300 ml-2"
        >
          노선 추가
        </button>
      </div>
      <ul class="mt-3 pl-0">
        <li class="d-flex items-center py-2 relative">
          <span class="subway-line-color-dot bg-blue-400"></span>
          <span class="w-100 pl-6 subway-line-list-item-name"
            >1호선</span
          >
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm"
          >
            삭제
          </button>
        </li>
        <hr class="my-0" />
      </ul>`;
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
