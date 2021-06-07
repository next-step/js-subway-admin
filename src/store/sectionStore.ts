import {Store} from "~@core";
import {Section, SectionRequest} from "~@domain";
import {sectionService} from "~services";

export const SET_SECTIONS = 'SET_SECTIONS';
export const GET_SECTIONS = 'GET_SECTIONS';
export const ADD_SECTION = 'ADD_SECTION';
export const UPDATE_SECTION = 'UPDATE_SECTION';
export const REMOVE_SECTION = 'REMOVE_SECTION';

interface SectionStoreState {
  sections: Section[];
}

export const stationStore = new Store<SectionStoreState>({
  state: {
    sections: sectionService.getSections(),
  },

  mutations: {
    [SET_SECTIONS](state: SectionStoreState, sections: Section[]) {
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

    [UPDATE_SECTION]({ dispatch }, station: Section) {
      sectionService.updateSection(station);
      dispatch(GET_SECTIONS);
    },

    [REMOVE_SECTION]({ dispatch }, station: Section) {
      sectionService.removeSection(station);
      dispatch(GET_SECTIONS);
    },

  },
});
