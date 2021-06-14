import { IAction } from "@/types";

let currentObserver = null;

export const observe = (fn: Function) => {
  console.log(currentObserver);
  currentObserver = fn;
};

class Store<IState> {
  protected state: IState;
  protected mutations: Record<string, Function>;
  protected observers: Set<Function>;

  constructor(initState: IState) {
    this.state = initState;
    this.observers = new Set();
  }

  public dispatch({ type, datas }: IAction): void {
    this.mutations[type](datas);
  }

  public getState(): IState {
    if (currentObserver) {
      this.observers.add(currentObserver);
      currentObserver = null;
    }
    console.log(currentObserver, this.observers, this.state);
    return this.state;
  }

  protected setState(nextState: IState): void {
    this.state = nextState;
    this.observers.forEach((observer) => observer());
  }
}

export default Store;
