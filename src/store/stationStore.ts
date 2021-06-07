import {Store} from "~@core";
import {Station} from "~@domain";
import {stationService} from "~services";

export const SET_STATIONS = 'SET_STATIONS';
export const GET_STATIONS = 'GET_STATIONS';
export const ADD_STATION = 'ADD_STATION';
export const UPDATE_STATION = 'UPDATE_STATION';
export const REMOVE_STATION = 'REMOVE_STATION';

interface StationStoreState {
  stations: Station[];
}

export const stationStore = new Store<StationStoreState>({
  state: {
    stations: stationService.getStations(),
  },

  mutations: {
    [SET_STATIONS](state: StationStoreState, stations: Station[]) {
      state.stations = stations;
    }
  },

  actions: {

    [GET_STATIONS]({ commit }) {
      commit(SET_STATIONS, stationService.getStations());
    },

    [ADD_STATION]({ commit, dispatch }, stationName: string) {
      stationService.addStation(stationName);
      dispatch(GET_STATIONS);
    },

    [UPDATE_STATION]({ commit, dispatch }, station: Station) {
      stationService.updateStation(station);
      dispatch(GET_STATIONS);
    },

    [REMOVE_STATION]({ commit, dispatch }, station: Station) {
      stationService.removeStation(station);
      dispatch(GET_STATIONS);
    },

  },
});
