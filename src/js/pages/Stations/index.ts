import Component from "@/core/component";
import router from "@/router";
import view from "./view";
import { StationForm, StationList } from "@/components";
import { authStore, stationStore } from "@/store";
import { PATH, MESSAGE, PAGE_TITLE } from "@/constants";
import { IPageInfo } from "@/types";
import { createElement } from "@/utils/dom";

class Stations extends Component {
  protected initDom(): void {
    this.$container = createElement({
      tag: "div",
      className: "wrapper p-10 bg-white",
    });
  }

  protected initChildren(): void {
    const stationForm = new StationForm(this.$container);
    const stationList = new StationList(this.$container);
    stationStore.addObserver(stationList);
    this.children = [stationForm, stationList];
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
      title: PAGE_TITLE.STATIONS,
      href: PATH.STATIONS,
    };
  }
}

export default Stations;
