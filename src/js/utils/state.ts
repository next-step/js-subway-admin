import { State, valueof } from '../types/index';

export const state: State = {
  currentPage: 'home'
};

export const setState = (
  prop: keyof State,
  nextState: valueof<State>
): void => {
  state[prop] = nextState;
};
