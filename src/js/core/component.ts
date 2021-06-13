import { IPageInfo } from "@/types";

class Component<IProps = unknown> {
  protected $container: HTMLElement = document.createElement("div");
  protected children: Component[] = [];
  protected props: IProps;

  constructor(props?: IProps) {
    this.props = props;
    this.mount();
  }

  protected beforeComponentMount(): void {}
  protected bindEvents(): void {}
  protected initDom(): void {}
  protected initChildren(): void {}
  protected componentMount(): void {}

  protected rootEvent(
    type: keyof HTMLElementEventMap,
    handler: EventListener
  ): void {
    this.$container.addEventListener(type, (e: Event) => {
      if (type === "submit") e.preventDefault();
      handler(e);
    });
  }

  public update(): void {
    this.componentMount();
  }

  protected mount(): void {
    this.initDom();
    this.initChildren();
    this.beforeComponentMount();
    this.componentMount();
    this.bindEvents();
  }

  protected beforeChangeURL(): boolean {
    return true;
  }

  public updateProps(nextProps: IProps): void {
    this.props = nextProps;
    this.componentMount();
  }

  public pageInfo(): IPageInfo | void {}

  public render(target: HTMLElement): void {
    target.appendChild(this.$container);
    this.componentMount();
    this.children.forEach((child) => child.render(this.$container));
  }
}

export default Component;
