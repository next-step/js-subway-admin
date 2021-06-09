import Component from "@/core/component";
import { SignUpForm } from "@/components";
import { PAGE_TITLE, PATH } from "@/constants";
import { IPageInfo } from "@/types";
import { authStore } from "@/store";
import { createElement } from "@/utils/dom";
import view from "./view";

class SignUp extends Component {
  protected initDom(): void {
    this.$container = createElement({
      tag: "div",
      className: "wrapper p-10 bg-white",
    });
  }

  protected initChildren(): void {
    const signUpForm = new SignUpForm();
    this.children = [signUpForm];
  }

  protected componentMount(): void {
    this.$container.innerHTML = view;
  }

  protected beforeChangeURL(): boolean {
    const { isLoggedIn } = authStore.getState();
    if (isLoggedIn) return false;
    return true;
  }

  public pageInfo(): IPageInfo {
    if (!this.beforeChangeURL()) return;
    return {
      title: PAGE_TITLE.SIGNUP,
      href: PATH.SIGNUP,
    };
  }
}

export default SignUp;
