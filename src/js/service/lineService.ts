import { lineDB } from "@/data";
import { lineStore, stationStore } from "@/store";
import { MESSAGE } from "@/constants";
import { ILine } from "@/types";
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

    stationService.updateLine([
      { name: upStation, lines: null },
      { name: downStation, lines: null },
    ]);

    const newData = lineDB.remove(id);
    lineStore.updateState({ lines: newData });
  },

  update: (nextData: ILine, prevData: ILine) => {
    try {
      const { id, name, upStation, downStation, color, distance, time } =
        nextData;
      const {
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
      let nextState;
      if (name !== prevName) {
        lineDB.remove(prevName);
        nextState = lineDB.add(nextData);
      } else {
        nextState = lineDB.update(id, nextData);
      }

      // 이름 검사 해야함.
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

      lineStore.updateState({ lines: nextState });
      uiService.closeModal();
    } catch (error) {
      alert(error);
    }
  },
};

export default lineService;
