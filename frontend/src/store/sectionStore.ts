import {Store} from "@/@core";
import {SectionResponse, SectionRequest} from "subway-domain";
import {sectionService} from "@/services";

export const SET_SECTIONS = 'SET_SECTIONS';
export const GET_SECTIONS = 'GET_SECTIONS';
export const ADD_SECTION = 'ADD_SECTION';
export const UPDATE_SECTION = 'UPDATE_SECTION';
export const REMOVE_SECTION = 'REMOVE_SECTION';

interface SectionStoreState {
  sections: SectionResponse[];
}

export const sectionStore = new Store<SectionStoreState>({
  state: {
    sections: sectionService.getSections(),
  },

  mutations: {
    [SET_SECTIONS](state: SectionStoreState, sections: SectionResponse[]) {
      state.sections = sections;
    }
  },

  actions: {

    [GET_SECTIONS]({ commit }) {
      commit(SET_SECTIONS, sectionService.getSections());
    },

    [ADD_SECTION]({ dispatch }, request: SectionRequest) {
      sectionService.addSection(request);
      dispatch(GET_SECTIONS);
    },

    [REMOVE_SECTION]({ dispatch }, stationIdx: number) {
      sectionService.removeSection(stationIdx);
      dispatch(GET_SECTIONS);
    },

  },
});
