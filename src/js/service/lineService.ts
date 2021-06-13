import { lineDB } from "@/data";
import { lineStore } from "@/store";
import { MESSAGE } from "@/constants";
import { ILine, ILineData } from "@/types";
import { uiService, stationService } from "@/service";
import {
  DUPLICATED_LINE_ERROR,
  NO_STATION_ERROR,
  NOT_CORRECT_LINE_ERROR,
} from "@/errors";

const isExistedLine = (name: string): boolean => {
  return lineDB.getAll().findIndex((line) => line.name === name) !== -1;
};

const lineService = {
  add: ({ name, upStation, downStation, color, distance, time }: ILineData) => {
    try {
      if (isExistedLine(name)) throw DUPLICATED_LINE_ERROR;
      if (!upStation || !downStation) throw NO_STATION_ERROR;
      if (upStation === downStation) throw NOT_CORRECT_LINE_ERROR;

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
    } catch ({ message }) {
      alert(message);
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

    if (prevName !== name && isExistedLine(name)) throw DUPLICATED_LINE_ERROR;
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
  },
};

export default lineService;
