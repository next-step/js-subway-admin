import { lineDB } from "@/data";
import { lineStore } from "@/store";
import { MESSAGE } from "@/constants";
import { uiService, stationService } from "@/service";

const lineService = {
  add: (
    name: string,
    upStation: string,
    downStation: string,
    color: string,
    distance: string,
    time: string
  ) => {
    try {
      const lines = lineDB.getAll();
      const isExistedLine =
        lines.findIndex((line) => line.name === name) !== -1;

      if (isExistedLine) throw MESSAGE.EXIST_LINE;
      if (!upStation || !downStation) throw MESSAGE.NOT_EXIST_LINE_STATION;
      if (upStation === downStation) throw MESSAGE.NOT_CORRECT_LINE_STATION;

      stationService.updateLine(upStation, name);
      stationService.updateLine(downStation, name);

      const newLine = lineDB.add({
        id: name,
        name,
        upStation,
        downStation,
        color,
        distance,
        time,
      });
      lineStore.updateState({
        lines: newLine,
      });
      uiService.closeModal();
    } catch (error) {
      alert(error);
    }
  },

  remove: (id: string) => {
    if (!confirm(MESSAGE.CONFIRM_REMOVE_LINE)) return;
    const { upStation, downStation } = lineDB.get(id);

    stationService.updateLine(upStation, null);
    stationService.updateLine(downStation, null);

    const newData = lineDB.remove(id);
    lineStore.updateState({ lines: newData });
  },
};

export default lineService;
