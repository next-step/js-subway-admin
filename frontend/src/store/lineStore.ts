import {LineResponse, LineRequest} from "subway-domain";
import {Store} from "@/_core";
import {lineService} from "@/services";

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
    lines: [],
  },

  mutations: {
    [SET_LINES](state: LineStoreState, lines: LineResponse[]) {
      state.lines = lines
    },
  },

  actions: {

    async [GET_LINES]({ commit }) {
      commit(SET_LINES, await lineService.getLines());
    },

    async [ADD_LINE]({ dispatch }, lineRequest: LineRequest) {
      await lineService.addLine(lineRequest);
      await dispatch(GET_LINES);
    },

    async [UPDATE_LINE]({ dispatch }, { idx, name, color }: LineRequest) {
      await lineService.updateLine(idx!, { name, color });
      await dispatch(GET_LINES);
    },

    async [REMOVE_LINE]({ dispatch }, { idx }: LineResponse) {
      await lineService.removeLine(idx);
      await dispatch(GET_LINES);
    },

  },
});
