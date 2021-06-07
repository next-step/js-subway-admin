import { IPageInfo } from "@/types";

class Component {
  constructor() {
    this.mount();
  }
  protected $container: HTMLElement = document.createElement("div");

  protected beforeComponentMount() {}
  protected bindEvents() {}
  protected initDom() {}
  protected initChildren() {}

  private mount() {
    this.beforeComponentMount();
    this.initDom();
    this.initChildren();
    this.bindEvents();
  }

  public render(): IPageInfo | void {}
}

export default Component;
