import { $ } from "@/utils/dom";

class Router<Ipage> {
  private pages: Ipage = {} as Ipage;
  constructor(pages) {
    this.setPages(pages);
    this.bindEvents();
  }

  protected setPages(pages: Ipage): void {
    this.pages = pages;
  }

  public push(href: string): void {
    if (this.pathname() === href) return;
    const { title = "", contents } = this.pages[href]?.render();
    history.pushState({ contents }, title, href);
    this.render();
  }

  public pathname(): string {
    return history.state?.href;
  }

  private bindEvents(): void {
    window.addEventListener("popstate", () => {
      this.render();
    });
  }

  private render(): void {
    $("#main").innerHTML = history.state.contents;
  }
}

export default Router;
