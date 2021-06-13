import { lineDB } from "@/data";
import { lineStore } from "@/store";
import { MESSAGE } from "@/constants";
import { ILine, ILineData } from "@/types";
import { uiService, stationService } from "@/service";

const isExistedLine = (name: string): boolean => {
  return lineDB.getAll().findIndex((line) => line.name === name) !== -1;
};

const lineService = {
  add: ({ name, upStation, downStation, color, distance, time }: ILineData) => {
    try {
      if (isExistedLine(name)) throw MESSAGE.EXIST_LINE;
      if (!upStation || !downStation) throw MESSAGE.NOT_EXIST_LINE_STATION;
      if (upStation === downStation) throw MESSAGE.NOT_CORRECT_LINE_STATION;

      stationService.updateLine([
        {
          name: upStation,
          lines: name,
        },
        {
          name: downStation,
          lines: name,
        },
      ]);

      const newLine = lineDB.add({
        id: Date.now().toString(),
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

    stationService.updateLine([
      { name: upStation, lines: null },
      { name: downStation, lines: null },
    ]);

    const newData = lineDB.remove(id);
    lineStore.updateState({ lines: newData });
  },

  update: (nextData: ILineData, prevData: ILine) => {
    try {
      const { name, upStation, downStation, color, distance, time } = nextData;
      const {
        id,
        name: prevName,
        upStation: prevUpStation,
        downStation: prevDownStation,
        color: prevColor,
        distance: prevDisance,
        time: prevTime,
      } = prevData;

      if (
        name === prevName &&
        upStation === prevUpStation &&
        downStation === prevDownStation &&
        color === prevColor &&
        distance === prevDisance &&
        time === prevTime
      )
        return;

      if (prevName !== name && isExistedLine(name)) throw MESSAGE.EXIST_LINE;
      stationService.updateLine([
        {
          name: prevUpStation,
          lines: null,
        },
        {
          name: prevDownStation,
          lines: null,
        },
        {
          name: upStation,
          lines: name,
        },
        {
          name: downStation,
          lines: name,
        },
      ]);

      const newData = lineDB.update(id, nextData);
      lineStore.updateState({ lines: newData });
      uiService.closeModal();
    } catch (error) {
      alert(error);
    }
  },
};

export default lineService;
