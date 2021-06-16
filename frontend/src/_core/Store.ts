import {observable} from "./";

type Commit<State> = (state: State, payload: any) => void;
type Dispatch<State> = (context: Context<State>, ...params: any[]) => any

interface Context<State> {
  state: State;
  commit: (type: string, payload: any) => void;
  dispatch: (type: string, ...params: any[]) => any;
}

interface StoreProps<State> {
  state: State;
  getters?: Record<string, (state: State) => any>;
  mutations?: Record<string, Commit<State>>;
  actions?: Record<string, Dispatch<State>>;
}

export class Store<State> {

  public $state: State;
  public readonly getters: Record<string, (state: State) => any>;
  private readonly mutations: Record<string, Commit<State>>;
  private readonly actions: Record<string, Dispatch<State>>;

  constructor({ state, getters = {}, mutations = {}, actions = {} }: StoreProps<State>) {
    this.$state = observable(state);
    this.mutations = mutations;
    this.actions = actions;
    this.getters = Object.keys(getters)
                         .reduce((obj, key) => {
                           Object.defineProperty(obj, key, {
                             get: () => getters[key](this.$state)
                           })
                           return obj;
                         }, {});
  }

  public commit(type: string, payload: any): void {
    this.mutations[type](this.$state, payload);
  }

  public dispatch(type: string, ...params: any[]): any {
    return this.actions[type]({
      state: Object.freeze(this.$state),
      commit: this.commit.bind(this),
      dispatch: this.dispatch.bind(this),
    }, ...params);
  }

}
