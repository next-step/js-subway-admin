import { IPageInfo } from "@/types";
import { observe } from "@/core/store";

class Component<IProps = unknown> {
  protected $container: HTMLElement = document.createElement("div");
  protected children: Component[] = [];
  protected props: IProps;
  private events: {
    type: keyof HTMLElementEventMap;
    handler: EventListener;
  }[] = [];

  constructor(props?: IProps) {
    this.props = props;
    this.setUp();
  }

  protected bindEvents(): void {}
  protected initDom(): void {}
  protected initChildren(): void {}
  protected componentWillUpdate(): void {} // 컴포넌트 리렌더링 되기 전
  protected render(): void {} // 실제 Dom의 HTMl을 그려주는 작업

  protected componentDidUpdate(): void {
    this.children.forEach((child) => child.updateComponent());
  }

  protected setUp(): void {
    this.initDom();
    this.initChildren();
    observe(() => this.updateComponent());
  }

  public mount(): HTMLElement {
    this.render();
    this.bindEvents();
    this.children.forEach((child) => {
      this.$container.appendChild(child.mount());
    });
    return this.$container;
  }

  // 컴포넌트 업데이트&초기렌더링 해주는 작업
  protected updateComponent(): void {
    this.componentWillUpdate();
    this.render();
    this.componentDidUpdate();
  }

  public componentWillUnmount(): void {
    this.events.forEach(({ type, handler }) => {
      this.$container.removeEventListener(type, handler);
    });
    this.children.forEach((child) => child.componentWillUnmount());
  }

  protected rootEvent(
    type: keyof HTMLElementEventMap,
    handler: EventListener
  ): void {
    this.events = [...this.events, { type, handler }];
    this.$container.addEventListener(type, handler);
  }

  public setState(nextState): void {
    this.updateComponent();
  }

  public updateProps(nextProps: IProps): void {
    this.props = nextProps;
    this.updateComponent();
  }

  protected beforeChangeURL() {}
  public pageInfo(): IPageInfo | void {}
}

export default Component;
