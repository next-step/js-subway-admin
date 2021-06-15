import Store from "@/core/store";
import { lineDB } from "@/data";
import { ILine } from "@/types";

interface IState {
  lines: ILine[];
}

class LineStore extends Store<IState> {}

const lineStore = new LineStore({ lines: lineDB.getAll() });
export default lineStore;
