import Component from "@/core/component";
class Store<IState> {
  observers: Component[] = [];
  state: IState;
  constructor() {
    this.observers = [];
    this.initState();
  }
  protected initState(): void {}

  protected updateState(nextState: IState): void {
    this.state = nextState;
    this.notify();
  }

  public addObserver(observer: Component): void {
    this.observers = [...this.observers, observer];
  }
  protected notify(): void {
    this.observers.forEach((observer) => observer.update());
  }
}

export default Store;
