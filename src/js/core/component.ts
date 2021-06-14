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
  // 자식들 리-렌더링 해준다.
  protected componentDidUpdate(): void {
    this.children.forEach((child) => child.updateComponent());
  }

  // 맨 처음 부른다.
  protected setUp(): void {
    this.initDom();
    this.initChildren();
    observe(() => this.updateComponent());
    this.bindEvents();
  }

  // DOM에 마운팅 페이지 바뀌었을 시 호출
  public mount(): HTMLElement {
    this.render();
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

  // 루트 엘리먼트에 이벤트 위임 시켜주는 작업
  protected rootEvent(
    type: keyof HTMLElementEventMap,
    handler: EventListener
  ): void {
    this.events = [...this.events, { type, handler }];
    this.$container.addEventListener(type, handler);
  }

  // state 변경
  public setState(nextState): void {
    this.updateComponent();
  }

  // props 변경
  public updateProps(nextProps: IProps): void {
    this.props = nextProps;
    this.updateComponent();
  }

  protected beforeChangeURL() {}
  public pageInfo(): IPageInfo | void {}
}

export default Component;
