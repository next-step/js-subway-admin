import { IPageInfo } from "@/types";
import { $ } from "@/utils/dom";

class Component<IProps = unknown> {
  protected $container: HTMLElement = document.createElement("div");
  protected children: Component[] = [];

  constructor(readonly $root?: HTMLElement, readonly props?: IProps) {
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
    this.beforeComponentMount();
    this.componentMount();
  }

  protected beforeChangeURL(): boolean {
    return true;
  }

  public pageInfo(): IPageInfo | void {}

  public render(target?: HTMLElement): void {
    target.innerHTML = "";
    target.appendChild(this.$container);
    this.bindEvents();
    this.componentMount();
    this.children.forEach((child) => child.render());
  }
}

export default Component;
