import { lineDB, stationDB } from "@/data";
import { lineStore } from "@/store";
import { MESSAGE } from "@/constants";
import { uiService } from "@/service";

const lineService = {
  addLine: (
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

      stationDB.update(upStation, { lines: name });
      stationDB.update(downStation, { lines: name });

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
};

export default lineService;
