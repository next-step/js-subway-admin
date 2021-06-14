import {Component} from "@/_core";
import {StationResponse} from "subway-domain";
import {StationAppender, StationItem, StationUpdateModal} from "./stations";
import {ADD_STATION, GET_STATIONS, lineStore, REMOVE_STATION, stationStore, UPDATE_STATION} from "@/store";

const STATION_NAME_MIN_LENGTH = 2;
const STATION_NAME_MAX_LENGTH = 20;

export class StationsPage extends Component {

  protected setup() {
    stationStore.dispatch(GET_STATIONS);
  }

  protected template(): string {
    const { stations } = stationStore.$state;

    return `
      <div class="wrapper bg-white p-10">
        <div class="heading">
          <h2 class="mt-1">🚉 역 관리</h2>
        </div>
        <div data-component="StationAppender"></div>
        ${stations.length > 0 ? `
          <ul class="mt-3 pl-0" data-component="StationItems">
            ${stations.map(({ idx, name }: StationResponse, key) => `
              <li style="list-style: none" data-idx="${idx}" data-key="${key}" data-component="StationItem"></li>
            `).join('')}
          </ul>
        ` : `
          <div style="padding: 20px 0; text-align: center;">등록된 역이 없습니다. 역을 추가해주세요.</div> 
        `}
      </div>
      <div data-component="StationUpdateModal"></div>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'StationAppender') {
      return new StationAppender(el, {
        addStation: this.addStation.bind(this),
      });
    }

    if (componentName === 'StationUpdateModal') {
      return new StationUpdateModal(el, {
        update: this.updateStation.bind(this),
      });
    }

    if (componentName === 'StationItem') {
      const station = stationStore.$state.stations[Number(el.dataset.key)];
      return new StationItem(el, {
        name: station.name,
        editStation: () => this.$modal.open(station),
        removeStation: () => this.removeStation(station),
      });
    }
  }

  private get $modal(): StationUpdateModal {
    return this.$components.StationUpdateModal as StationUpdateModal;
  }

  private async addStation(stationName: string) {
    try {
      this.validateStationName(stationName);
    } catch (message) {
      return alert(message);
    }

    try {
      await stationStore.dispatch(ADD_STATION, stationName);
      alert('역이 추가되었습니다.');
    } catch (e) {
      alert(e.message);
    }
  }

  private async updateStation(station: StationResponse) {
    try {
      this.validateStationName(station.name);
    } catch (message) {
      return alert(message);
    }

    try {
      await stationStore.dispatch(UPDATE_STATION, station);
      alert('역이 수정되었습니다.');
      this.$modal.close();
    } catch (e) {
      alert(e.message);
    }
  }

  private async removeStation(station: StationResponse) {

    try {
      await stationStore.dispatch(REMOVE_STATION, station);
      alert('역이 삭제되었습니다.');
    } catch (e) {
      alert(e.message);
    }

  }

  private validateStationName(stationName: string) {
    if (stationName.length < STATION_NAME_MIN_LENGTH) {
      throw `역의 이름은 ${STATION_NAME_MIN_LENGTH}글자 이상으로 입력해주세요.`;
    }

    if (stationName.length >= STATION_NAME_MAX_LENGTH) {
      throw `역의 이름은 ${STATION_NAME_MAX_LENGTH}글자 이하로 입력해주세요.`;
    }
  }
}
