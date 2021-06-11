import { $ } from "@/utils/dom";
import { NotFound } from "@/pages";

class Router<Ipage> {
  private notFound = new NotFound();
  private pages: Ipage = {} as Ipage;
  constructor(pages: Ipage) {
    this.setPages(pages);
    this.bindEvents();
  }

  protected setPages(pages: Ipage): void {
    this.pages = pages;
  }

  public push(href: string): void {
    const pageInfo = this.pages[href]?.pageInfo();
    if (!pageInfo) return;
    const { title = "" } = pageInfo;
    history.pushState({ href }, title, href);
    this.render();
  }

  public pathname(): string {
    return history.state?.href ?? "";
  }

  private bindEvents(): void {
    window.addEventListener("popstate", () => {
      this.render();
    });
  }

  private render(): void {
    const { href } = history.state;
    const $main = $("#main");
    $main.innerHTML = "";
    if (this.pages[href]) {
      this.pages[href].render($main);
      return;
    }
    this.notFound.render($main);
  }
}

export default Router;
