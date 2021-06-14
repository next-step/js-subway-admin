import { IAction } from "@/types";

let currentObserver = null;

export const observe = (fn: Function): void => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

class Store<IState> {
  protected state: IState;
  protected mutations: Record<string, Function>;
  protected observers: Set<Function>;

  constructor(initState: IState) {
    this.state = initState;
    this.observers = new Set();
  }

  public dispatch({ type, datas = null, error = null }: IAction): void {
    this.mutations[type]({ datas, error });
  }

  public getState(): IState {
    if (currentObserver) {
      this.observers.add(currentObserver);
    }
    return this.state;
  }

  protected setState(nextState: IState): void {
    this.state = nextState;
    this.observers.forEach((observer) => observer());
  }
}

export default Store;
