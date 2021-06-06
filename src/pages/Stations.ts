import {Component} from "~@core";
import {Station} from "~@domain";
import {stationService} from "~services";

interface StationState {
  stations: Station[];
}

const MIN_STATION_LENGTH = 2;
const MAX_STATION_LENGTH = 20;

export class Stations extends Component<StationState> {

  protected setup() {
    this.$state = {
      stations: stationService.getStations(),
    }
  }

  protected template(): string {
    const { stations } = this.$state;

    return `
      <div class="wrapper bg-white p-10">
        <div class="heading">
          <h2 class="mt-1">🚉 역 관리</h2>
        </div>
        <form>
          <div class="d-flex w-100">
            <label for="station-name" class="input-label" hidden>
              역 이름
            </label>
            <input
              type="text"
              id="station-name"
              name="stationName"
              class="input-field"
              placeholder="역 이름"
              required
            />
            <button type="submit" class="input-submit bg-cyan-300 ml-2">
              확인
            </button>
          </div>
        </form>
        ${
          stations.length > 0 ? `
            <ul class="mt-3 pl-0">
              ${stations.map(({ idx, name }: Station) => `
                <li style="list-style: none" data-idx="${idx}">
                  <div class="station-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2">${name}</span>
                    <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1">
                      수정
                    </button>
                    <button type="button" class="bg-gray-50 text-gray-500">
                      삭제
                    </button>          
                  </div>
                  <hr class="my-0" />
                </li>
              `).join('')}
            </ul>
          ` : `
            <div style="padding: 20px 0; text-align: center;">등록된 역이 없습니다. 역을 추가해주세요.</div> 
          `
        }
      </div>
    `;
  }

  private addStation(stationName: string) {
    if (stationName.length < MIN_STATION_LENGTH) {
      return alert(`역의 이름은 ${MIN_STATION_LENGTH}글자 이상으로 입력해주세요.`);
    }

    if (stationName.length >= MAX_STATION_LENGTH) {
      return alert(`역의 이름은 ${MAX_STATION_LENGTH}글자 이하로 입력해주세요.`);
    }

    try {
      stationService.addStation(stationName);
      this.$state.stations = stationService.getStations();
      alert('역이 추가되었습니다.');
    } catch (e) {
      alert(e.message);
    }
  }

  protected setEvent() {
    this.addEvent('submit', 'form', (event: Event) => {
      event.preventDefault();
      const frm = event.target as HTMLFormElement;
      this.addStation(frm.stationName.value);
    });
  }
}
