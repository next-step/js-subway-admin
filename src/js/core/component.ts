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

  // 언마운트 - 페이지 바뀔 때 해지
  public componentWillUnmount(): void {
    this.events.forEach(({ type, handler }) => {
      this.$container.removeEventListener(type, handler);
    });
    this.children.forEach((child) => child.componentWillUnmount());
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

  // 문제점
  // children이 re-render가 되어야지, re-mount가 되어서는 안된다..
  // 근데 이 플로우라면.. 다시 target에 append되어버리는거다...ㅠ.ㅠ.ㅠㅠㅠ.ㅠ오노~~!
  // 이게 문제인게 child 를 이렇게...렌더링해버리면 안된다.
  // page의 innerHTML 내부에 children이 있어야지..innerHTML 따로 -> child 마운팅 따로 해버리니까 이렇ㄱ ㅔ된다.
  // 리액트처럼 child를 innerHtml 내부에 마운팅 할 방법은 없을까
  // 방법은..있다.ㅡ.ㅡ..................................
  // children의 target을 루트 컨테이너에 mount 시켜버리는것이답...
  // 아예 setUp 에서 return this.container를 해주면 됨ㅋㅋㅋㅋ
}

export default Component;
