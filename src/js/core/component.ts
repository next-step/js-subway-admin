import { IPageInfo } from "@/types";

class Component {
  protected $root: HTMLElement = document.createElement("div");
  protected $container: HTMLElement = document.createElement("div");

  constructor() {
    this.mount();
  }

  protected beforeComponentMount(): void {}
  protected bindEvents(): void {}
  protected initDom(): void {}
  protected initChildren(): void {}
  protected componentMount(): void {}

  public update(): void {
    this.componentMount();
  }

  protected mount(): void {
    this.initDom();
    this.initChildren();
    this.bindEvents();
    this.beforeComponentMount();
    this.componentMount();
  }

  protected beforeChangeURL(): boolean {
    return true;
  }

  public render(): IPageInfo | void {}
}

export default Component;
