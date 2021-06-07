import Component from "@/core/component";
import { LoginForm } from "@/components";
import { PAGE_TITLE } from "@/constants";
import { IPageInfo } from "@/types";
import { authStore } from "@/store";

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
    const { isLoggedIn } = authStore.getState();
    if (isLoggedIn) return false;
    return true;
  }

  public render(): IPageInfo {
    if (!this.beforeChangeURL()) return;
    return {
      title: PAGE_TITLE.LOGIN,
      contents: this.$container.outerHTML,
    };
  }
}

export default Login;
