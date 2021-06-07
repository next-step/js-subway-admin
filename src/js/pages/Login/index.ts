import Component from "@/core/component";
import view from "@/pages/Login/view";
import { PAGE_TITLE } from "@/constants";
import { IPageInfo } from "@/types";

class Login extends Component {
  protected beforeComponentMount(): void {
    // 로그인 되어있다면 뒤로가기 혹은 인덱스페이지로 푸시
  }

  protected initDom(): void {
    this.$container = document.createElement("div");
    this.$container.className = "wrapper p-10 bg-white";
  }

  protected componentMount(): void {
    this.$container.innerHTML = view;
  }

  protected bindEvents(): void {}

  public render(): IPageInfo {
    this.mount();
    return {
      title: PAGE_TITLE.LOGIN,
      contents: this.$container.outerHTML,
    };
  }
}

export default Login;
