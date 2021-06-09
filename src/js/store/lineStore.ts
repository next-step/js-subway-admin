import Store from "@/core/store";
import { lineDB } from "@/data";
import { ILine } from "@/types";

interface IState {
  lines: ILine[];
}

class LineStore extends Store<IState> {
  protected initState(): void {
    this.state = { lines: lineDB.getAll() };
  }
}

const lineStore = new LineStore();
export default lineStore;
