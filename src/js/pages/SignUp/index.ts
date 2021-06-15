import Component from "@/core/component";
import { SignUpForm } from "@/components";
import { PAGE_TITLE, PATH } from "@/constants";
import { IPageInfo } from "@/types";
import { authStore } from "@/store";
import { newElement } from "@/utils/dom";

class SignUp extends Component {
  protected initDom(): void {
    this.$container = newElement(`<div class="wrapper p-10 bg-white"/>`);
  }

  protected initChildren(): void {
    const signUpForm = new SignUpForm();
    this.children = [signUpForm];
  }

  protected beforeChangeURL(): boolean {
    // const { isLoggedIn } = authStore.getState();
    // if (isLoggedIn) return false;
    return true;
  }

  public pageInfo(): IPageInfo {
    if (!this.beforeChangeURL()) return;
    return {
      title: PAGE_TITLE.SIGNUP,
      href: PATH.SIGNUP,
    };
  }

  protected render(): void {
    this.$container.innerHTML = `
    <div class="heading">
      <h2 class="text">📝 회원가입</h2>
    </div>
    `;
  }
}

export default SignUp;
