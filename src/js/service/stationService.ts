import { stationStore } from "@/store";
import { MESSAGE } from "@/constants";
import { stationDB } from "@/data";
import { stationNameValidator } from "@/utils/validator";

const stationService = {
  add: (name: string): void => {
    try {
      if (!stationNameValidator(name)) throw MESSAGE.NOT_CORRECT_STATION;
      const stations = stationDB.getAll();
      const isExistedStation =
        stations.findIndex((station) => station.name === name) !== -1;
      if (isExistedStation) throw MESSAGE.EXIST_STATION;

      const newData = stationDB.add({ id: name, name, lines: null });
      stationStore.updateState({ stations: newData });
    } catch (error) {
      alert(error);
    }
  },

  remove: (id: string): void => {
    try {
      if (!confirm(MESSAGE.CONFIRM_REMOVE_STATION)) return;
      const isLineExisted = !!stationDB.get(id).lines;
      if (isLineExisted) throw MESSAGE.STATION_REMOVE_NOT_POSSIBLE;
      const newData = stationDB.remove(id);
      stationStore.updateState({ stations: newData });
    } catch (error) {
      alert(error);
    }
  },

  update: (id: string, newName: string): void => {
    const newData = stationDB.update(id, { name: newName });
    stationStore.updateState({ stations: newData });
  },
};

export default stationService;
