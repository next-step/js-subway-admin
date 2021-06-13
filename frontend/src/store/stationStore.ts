import {Store} from "@/@core";
import {StationResponse} from "subway-domain";
import {stationService} from "@/services";

export const SET_STATIONS = 'SET_STATIONS';
export const GET_STATIONS = 'GET_STATIONS';
export const ADD_STATION = 'ADD_STATION';
export const UPDATE_STATION = 'UPDATE_STATION';
export const REMOVE_STATION = 'REMOVE_STATION';

interface StationStoreState {
  stations: StationResponse[];
}

export const stationStore = new Store<StationStoreState>({
  state: {
    stations: stationService.getStations(),
  },

  mutations: {
    [SET_STATIONS](state: StationStoreState, stations: StationResponse[]) {
      state.stations = stations;
    }
  },

  actions: {

    [GET_STATIONS]({ commit }) {
      commit(SET_STATIONS, stationService.getStations());
    },

    [ADD_STATION]({ dispatch }, stationName: string) {
      stationService.addStation(stationName);
      dispatch(GET_STATIONS);
    },

    [UPDATE_STATION]({ dispatch }, station: StationResponse) {
      stationService.updateStation(station);
      dispatch(GET_STATIONS);
    },

    [REMOVE_STATION]({ dispatch }, station: StationResponse) {
      stationService.removeStation(station);
      dispatch(GET_STATIONS);
    },

  },
});
