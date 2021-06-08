import Store from "@/core/store";
import { stationDB } from "@/data";
import { IStation } from "@/types";

interface IState {
  stations: IStation[];
}

class StationStore extends Store<IState> {
  protected initState(): void {
    this.state = { stations: stationDB.getAll() };
  }
}

const stationStore = new StationStore();
export default stationStore;
