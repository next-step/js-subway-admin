import Component from "@/core/component";
import router from "@/router";
import { authStore } from "@/store";
import { PATH, MESSAGE, PAGE_TITLE } from "@/constants";
import { IPageInfo } from "@/types";

class Stations extends Component {
  protected beforeChangeURL(): boolean {
    const { isLoggedIn } = authStore.getState();
    if (isLoggedIn) return true;

    alert(MESSAGE.LOGIN_REQUIRED);
    router.push(PATH.LOGIN);
    return false;
  }
  public render(): IPageInfo {
    if (!this.beforeChangeURL()) return;
    return {
      title: PAGE_TITLE.STATIONS,
      contents: `this.$container.outerHTML`,
    };
  }
}

export default Stations;
