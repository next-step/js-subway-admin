import {Store} from "~@core";
import {LineResponse, LineRequest} from "subway-domain";
import {lineService} from "~services";

export const SET_LINES = 'SET_LINES';
export const GET_LINES = 'GET_LINES';
export const ADD_LINE = 'ADD_LINE';
export const UPDATE_LINE = 'UPDATE_LINE';
export const REMOVE_LINE = 'REMOVE_LINE';

interface LineStoreState {
  lines: LineResponse[];
}

export const lineStore = new Store<LineStoreState>({
  state: {
    lines: lineService.getLines(),
  },

  mutations: {
    [SET_LINES](state: LineStoreState, lines: LineResponse[]) {
      state.lines = lines
    }
  },

  actions: {

    [GET_LINES]({ commit }) {
      commit(SET_LINES, lineService.getLines());
    },

    [ADD_LINE]({ dispatch }, lineRequest: LineRequest) {
      lineService.addLine(lineRequest);
      dispatch(GET_LINES);
    },

    [UPDATE_LINE]({ dispatch }, line: LineResponse) {
      lineService.updateLine(line);
      dispatch(GET_LINES);
    },

    [REMOVE_LINE]({ dispatch }, line: LineResponse) {
      lineService.removeLine(line);
      dispatch(GET_LINES);
    },

  },
});
