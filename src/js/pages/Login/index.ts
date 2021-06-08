import Component from "@/core/component";
import { LoginForm } from "@/components";
import { PAGE_TITLE, PATH } from "@/constants";
import { IPageInfo } from "@/types";
import { authStore } from "@/store";
import { createElement } from "@/utils/dom";
import view from "./view";

class Login extends Component {
  protected initDom(): void {
    this.$container = createElement({
      tag: "div",
      className: "wrapper p-10 bg-white",
    });
  }

  protected initChildren(): void {
    const loginForm = new LoginForm(this.$container);
    this.children = [loginForm];
  }

  protected beforeChangeURL(): boolean {
    const { isLoggedIn } = authStore.getState();
    if (isLoggedIn) return false;
    return true;
  }

  protected componentMount(): void {
    this.$container.innerHTML = view;
  }

  public pageInfo(): IPageInfo {
    if (!this.beforeChangeURL()) return;
    return {
      title: PAGE_TITLE.LOGIN,
      href: PATH.LOGIN,
    };
  }
}

export default Login;
