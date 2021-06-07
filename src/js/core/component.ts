import { IPageInfo } from "@/types";

class Component {
  protected $container: HTMLElement = document.createElement("div");

  constructor() {
    this.initDom();
    this.initChildren();
    this.bindEvents();
    this.mount();
  }

  protected beforeComponentMount() {}
  protected bindEvents() {}
  protected initDom() {}
  protected initChildren() {}
  protected componentMount() {}

  public update() {
    this.componentMount();
  }

  protected mount() {
    this.beforeComponentMount();
    this.componentMount();
  }

  public render(): IPageInfo | void {}
}

export default Component;
