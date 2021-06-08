import Component from "@/core/component";
class Store<IState> {
  private observers: Component[] = [];
  protected state: IState;
  constructor() {
    this.observers = [];
    this.initState();
  }

  public getState(): IState {
    return this.state;
  }
  protected initState(): void {}

  public updateState(nextState: IState): void {
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
