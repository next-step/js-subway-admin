import Component from "@/core/component";
import router from "@/router";
import { LoginForm } from "@/components";
import { PAGE_TITLE, PATH } from "@/constants";
import { IPageInfo } from "@/types";
import { authStore } from "@/store";
import { newElement } from "@/utils/dom";

class Login extends Component {
  protected useSelector(): unknown {
    const { isLoggedIn } = authStore.getState();
    return isLoggedIn;
  }

  protected initDom(): void {
    this.$container = newElement(`<div class="wrapper p-10 bg-white"/>`);
  }

  protected initChildren(): void {
    const loginForm = new LoginForm();
    this.children = [loginForm];
  }

  protected beforeChangeURL(): boolean {
    const isLoggedIn = this.useSelector();
    return !isLoggedIn;
  }

  public pageInfo(): IPageInfo {
    if (!this.beforeChangeURL()) return;
    return {
      title: PAGE_TITLE.LOGIN,
      href: PATH.LOGIN,
    };
  }

  protected componentWillUpdate(): void {
    const { login_success, login_error } = authStore.getState();
    if (login_success) router.push(PATH.STATIONS);
    else if (login_error) alert(login_error);
  }

  protected render(): void {
    this.$container.innerHTML = `
    <div class="heading">
      <h2>👋🏼 로그인</h2>
    </div>
    `;
  }
}

export default Login;
