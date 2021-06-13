import Component from "@/core/component";
import router from "@/router";
import { StationForm, StationList } from "@/components";
import { authStore, stationStore } from "@/store";
import { PATH, MESSAGE, PAGE_TITLE } from "@/constants";
import { IPageInfo } from "@/types";
import { newElement } from "@/utils/dom";

class Stations extends Component {
  protected initDom(): void {
    this.$container = newElement(`<div class="wrapper p-10 bg-white"/>`);
  }

  protected initChildren(): void {
    const stationForm = new StationForm();
    const stationList = new StationList();
    stationStore.addObserver(stationList);
    this.children = [stationForm, stationList];
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
      title: PAGE_TITLE.STATIONS,
      href: PATH.STATIONS,
    };
  }

  protected componentMount(): void {
    this.$container.innerHTML = `
    <div class="heading">
      <h2 class="mt-1">🚉 역 관리</h2>
    </div>
    `;
  }
}

export default Stations;
