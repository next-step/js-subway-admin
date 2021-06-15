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
    const prevhref = history.state?.href ?? href;
    const { title = "" } = pageInfo;
    history.pushState({ href, prevhref }, title, href);
    this.render();
  }

  public pathname(): string {
    return history.state?.href ?? "";
  }

  private bindEvents(): void {
    window.addEventListener("popstate", () => {
      console.log(history.state);
      this.render();
    });
  }

  private render(): void {
    const { href, prevhref } = history.state;
    if (href !== prevhref) this.unmount(prevhref);

    const $main = $("#main");
    $main.innerHTML = "";
    if (this.pages[href]) {
      $main.appendChild(this.pages[href].mount());
      return;
    }
    $main.appendChild(this.notFound.mount());
  }

  private unmount(prevHref: string): void {
    this.pages[prevHref].componentWillUnmount();
  }
}

export default Router;
