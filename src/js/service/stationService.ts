import { MESSAGE } from "@/constants";
import { uiService } from "@/service";
import { stationStore } from "@/store";
import { stationDB } from "@/data";
import { stationNameValidator } from "@/utils/validator";

interface IUpdateStation {
  name: string;
  lines: string | null;
}

const isExistedStation = (name: string): boolean => {
  return (
    stationDB.getAll().findIndex((station) => station.name === name) !== -1
  );
};

const stationService = {
  add: (name: string): void => {
    try {
      if (!stationNameValidator(name)) throw MESSAGE.NOT_CORRECT_STATION;
      if (isExistedStation(name)) throw MESSAGE.EXIST_STATION;

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
    try {
      if (!stationNameValidator(newName)) throw MESSAGE.NOT_CORRECT_STATION;
      if (isExistedStation(newName)) throw MESSAGE.EXIST_STATION;
      const newData = stationDB.update(id, { name: newName });
      stationStore.updateState({ stations: newData });
      uiService.closeModal();
    } catch (error) {
      alert(error);
    }
  },

  updateLine: (datas: IUpdateStation[]) => {
    let newData;
    datas.forEach(({ name, lines }) => {
      newData = stationDB.update(name, { lines });
    });
    stationStore.updateState({ stations: newData });
  },
};

export default stationService;
