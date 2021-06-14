import '../assets/css/pages/lines.css';
import {Component} from "@/_core";
import {LineResponse, LineRequest} from "subway-domain";
import {ADD_LINE, GET_LINES, GET_STATIONS, lineStore, REMOVE_LINE, stationStore, UPDATE_LINE} from "@/store";
import {LineItem, LineEditModal} from "./lines";

const LINE_NAME_MIN_LENGTH = 2;
const LINE_NAME_MAX_LENGTH = 10;

export class LinesPage extends Component {

  protected setup() {
    lineStore.dispatch(GET_LINES);
    stationStore.dispatch(GET_STATIONS);
  }

  protected template(): string {

    const { lines } = lineStore.$state;

    return `
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
          <button type="button" class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2 edit-line">
            노선 추가
          </button>
        </div>
        ${ lines.length > 0 ? `
          <ul class="mt-3 pl-0">
            ${lines.map(({ idx, name }, key) => `
              <li style="list-style: none" data-idx="${idx}" data-key="${key}" data-component="LineItem"></li>
            `).join('')}
          </ul>
        ` : `
          <div>등록된 노선이 없습니다. 노선을 추가해주세요.</div>
        ` }
      </div>
      <div data-component="LineEditModal"></div>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'LineItem') {
      const line = lineStore.$state.lines[Number(el.dataset.key)];
      return new LineItem(el, {
        name: line.name,
        color: line.color,
        editLine: () => this.$modal.open(line),
        removeLine: () => this.removeLine(line),
      });
    }

    if (componentName === 'LineEditModal') {
      return new LineEditModal(el, {
        stations: stationStore.$state.stations,
        addLine: this.addLine.bind(this),
        updateLine: this.updateLine.bind(this),
      });
    }
  }

  private get $modal() {
    return this.$components.LineEditModal as LineEditModal;
  }

  private async addLine(lineRequest: LineRequest) {
    try {
      this.validateLineName(lineRequest.name);
    } catch (message) {
      return alert(message);
    }

    try {
      await lineStore.dispatch(ADD_LINE, lineRequest);
      alert('노선이 추가되었습니다.');
    } catch (e) {
      alert(e.message);
    }
  }

  private async updateLine(lineRequest: LineRequest) {
    try {
      this.validateLineName(lineRequest.name);
    } catch (message) {
      return alert(message);
    }

    try {
      await lineStore.dispatch(UPDATE_LINE, lineRequest);
      alert('노선이 수정되었습니다.');
    } catch (e) {
      alert(e.message);
    }
  }

  private async removeLine(line: LineResponse) {
    try {
      await lineStore.dispatch(REMOVE_LINE, line);
      alert('노선이 삭제되었습니다.');
    } catch (e) {
      alert(e.message);
    }
  }

  private validateLineName(stationName: string) {
    if (stationName.length < LINE_NAME_MIN_LENGTH) {
      throw `노선의 이름은 ${LINE_NAME_MIN_LENGTH}글자 이상으로 입력해주세요.`;
    }

    if (stationName.length >= LINE_NAME_MAX_LENGTH) {
      throw `노선의 이름은 ${LINE_NAME_MAX_LENGTH}글자 이하로 입력해주세요.`;
    }
  }

  protected setEvent() {

    this.addEvent('click', '.edit-line', (event: Event) => {
      this.$modal.open();
    });

  }
}
