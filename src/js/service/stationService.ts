import stationStore from "@/store/stationStore";
import { MESSAGE } from "@/constants";
import { stationDB } from "@/data";
import { stationNameValidator } from "@/utils/validator";

const stationService = {
  add: (name: string): void => {
    try {
      if (stationNameValidator(name)) throw MESSAGE.NOT_CORRECT_STATION;
      const stations = stationDB.getAll();
      const isExistedStation =
        stations.findIndex((station) => station.name === name) !== -1;
      if (isExistedStation) throw MESSAGE.EXIST_STATION;

      const newData = stationDB.add({ id: Date.now().toString(), name });
      stationStore.updateState({ stations: newData });
    } catch (error) {
      alert(error);
    }
  },

  remove: (id: string): void => {
    if (!confirm(MESSAGE.CONFIRM_REMOVE_STATION)) return;
    const newData = stationDB.remove(id);
    stationStore.updateState({ stations: newData });
  },

  update: (id: string, newName: string): void => {},
};

export default stationService;
