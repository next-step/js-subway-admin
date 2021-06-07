import Component from "@/core/component";
import router from "@/router";
import { PATH, MESSAGE, PAGE_TITLE } from "@/constants";
import { IPageInfo } from "@/types";

class Stations extends Component {
  protected beforeChangeURL(): boolean {
    alert(MESSAGE.LOGIN_REQUIRED);
    router.push(PATH.LOGIN);
    return false;
  }
  public render(): IPageInfo {
    const isChangable = this.beforeChangeURL();
    if (!isChangable) return;
    return {
      title: PAGE_TITLE.STATIONS,
      contents: `this.$container.outerHTML`,
    };
  }
}

export default Stations;
