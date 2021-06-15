import Store from "@/core/store";
import { stationDB } from "@/data";
import { IStation } from "@/types";

interface IState {
  stations: IStation[];
}

class StationStore extends Store<IState> {
  public getAvailableStations(): IStation[] {
    return this.state.stations.filter((station) => !station.lines);
  }
}

const stationStore = new StationStore({ stations: stationDB.getAll() });
export default stationStore;
