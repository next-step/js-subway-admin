import { MESSAGE } from "@/constants";
import { uiService } from "@/service";
import { stationStore } from "@/store";
import { stationDB } from "@/data";
import { stationNameValidator } from "@/utils/validator";
import {
  NOT_CORRECT_STATION_ERROR,
  DUPLICATED_STATION_ERROR,
  STATION_REMOVE_NOT_POSSIBLE_ERROR,
} from "@/errors";

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
    if (!stationNameValidator(name)) throw NOT_CORRECT_STATION_ERROR;
    if (isExistedStation(name)) throw DUPLICATED_STATION_ERROR;

    const newData = stationDB.add({ id: name, name, lines: null });
    stationStore.updateState({ stations: newData });
  },

  remove: (id: string): void => {
    if (!confirm(MESSAGE.CONFIRM_REMOVE_STATION)) return;
    const isLineExisted = !!stationDB.get(id).lines;
    if (isLineExisted) throw STATION_REMOVE_NOT_POSSIBLE_ERROR;
    const newData = stationDB.remove(id);
    stationStore.updateState({ stations: newData });
  },

  update: (id: string, newName: string): void => {
    if (!stationNameValidator(newName)) throw NOT_CORRECT_STATION_ERROR;
    if (isExistedStation(newName)) throw DUPLICATED_STATION_ERROR;
    const newData = stationDB.update(id, { name: newName });
    stationStore.updateState({ stations: newData });
    uiService.closeModal();
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
