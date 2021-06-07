import Component from "@/core/component";
import view from "@/pages/Login/view";
import { LoginForm } from "@/components";
import { PAGE_TITLE } from "@/constants";
import { IPageInfo } from "@/types";

class Login extends Component {
  $loginForm: Component = {} as Component;

  protected initDom(): void {
    this.$container = document.createElement("div");
    this.$container.className = "wrapper p-10 bg-white";
  }

  protected initChildren() {
    this.$loginForm = new LoginForm(this.$container);
  }

  protected beforeChangeURL(): boolean {
    // 이미 로그인되었는지 확인
    return true;
  }

  public render(): IPageInfo {
    console.log(this.$container);
    return {
      title: PAGE_TITLE.LOGIN,
      contents: this.$container.outerHTML,
    };
  }
}

export default Login;
