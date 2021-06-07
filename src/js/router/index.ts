import { $ } from "@/utils/dom";
import { PATH } from "@/constants";
import { Login } from "@/pages";
import { IPageInfo } from "@/types";
import Component from "@/core/component";

type IPages = {
  [x in PATH]: Component;
};

class Router {
  private pages: IPages = {} as IPages;
  constructor() {
    this.bindPopStateEvent();
    this.pages = {
      [PATH.LOGIN]: new Login(),
      [PATH.LINE]: new Login(),
      [PATH.SECTIONS]: new Login(),
      [PATH.SIGNUP]: new Login(),
      [PATH.STATIONS]: new Login(),
    };
  }

  public push(href: PATH): void {
    const { title = "", contents } = this.pages[href]?.render() as IPageInfo;
    history.pushState({ contents }, title, href);
    this.render();
  }

  public pathname(): string {
    return history.state.href;
  }

  private bindPopStateEvent(): void {
    window.addEventListener("popstate", () => {
      this.render();
    });
  }

  private render(): void {
    const { main, modal = "" } = history.state.contents;
    $("#main").innerHTML = main;
    $("#modal").innerHTML = modal;
  }
}

const router = new Router();

export default router;
