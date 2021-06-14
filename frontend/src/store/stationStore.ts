import {Store} from "@/_core";
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
    stations: [],
  },

  mutations: {
    [SET_STATIONS](state: StationStoreState, stations: StationResponse[]) {
      state.stations = stations;
    }
  },

  actions: {

    async [GET_STATIONS]({ commit }) {
      commit(SET_STATIONS, await stationService.getStations());
    },

    async [ADD_STATION]({ dispatch }, name: string) {
      await stationService.addStation({ name });
      await dispatch(GET_STATIONS);
    },

    async [UPDATE_STATION]({ dispatch }, { idx, name }: StationResponse) {
      await stationService.updateStation(idx, { name });
      await dispatch(GET_STATIONS);
    },

    async [REMOVE_STATION]({ dispatch }, { idx }: StationResponse) {
      await stationService.removeStation(idx);
      await dispatch(GET_STATIONS);
    },

  },
});
