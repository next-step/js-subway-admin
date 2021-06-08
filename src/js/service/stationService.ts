import stationStore from "@/store/stationStore";
import { MESSAGE } from "@/constants";
import { stationDB } from "@/data";

const stationService = {
  add: (name: string): void => {
    try {
      if (name.length < 2) throw MESSAGE.NOT_CORRECT_STATION;
      const stations = stationDB.getAll();
      const isExistedStation =
        stations.findIndex((station) => station.name === name) !== -1;
      if (isExistedStation) throw MESSAGE.EXIST_STATION;

      const newData = stationDB.add({ id: name, name });
      stationStore.updateState({ stations: newData });
    } catch (error) {
      alert(error);
    }
  },

  remove: (id: string): void => {},

  update: (id: string, newName: string): void => {},
};

export default stationService;
