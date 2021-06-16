import '../assets/css/pages/sections.css';
import {Component} from "@/_core";
import {SectionEditorModal} from "./sections";
import {SectionItem} from "@/pages/sections/SectionItem";
import {GET_LINES, GET_STATIONS, lineStore, stationStore} from "@/store";
import {LineResponse, SectionRequest, StationResponse} from "subway-domain";
import {lineService} from "@/services";

interface SectionsPageState {
  selectedLineIdx: number;
  line: LineResponse | null;
}

export class SectionsPage extends Component<SectionsPageState> {

  protected setup() {
    this.$state = {
      selectedLineIdx: -1,
      line: null,
    }

    lineStore.dispatch(GET_LINES);
    stationStore.dispatch(GET_STATIONS);
  }

  private get selectedLine(): LineResponse | null {
    const { selectedLineIdx } = this.$state;
    const { lines } = lineStore.$state;
    return lines.find(v => v.idx === selectedLineIdx) || null;
  }

  private get selectedColor(): string {
    const { selectedLine } = this;
    return selectedLine?.color || 'bg-400';
  }

  private get stations(): StationResponse[] {
    return this.$state.line?.stations || [];
  }

  private get lineIdx(): number {
    return this.$state.line?.idx!;
  }

  protected template(): string {

    const { selectedColor, selectedLine, stations } = this;
    const { selectedLineIdx } = this.$state;
    const { lines } = lineStore.$state;

    return `
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🔁 구간 관리</h2>
          <button type="button" class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2">
            구간 추가
          </button>
        </div>
        <form class="d-flex items-center pl-1">
          <label for="subway-line" class="input-label" hidden>노선</label>
          <select id="subway-line" class="bg-${selectedColor} lineSelector">
            ${lines.length === 0 ? `
              <option hidden disabled selected>노선을 추가해주세요</option>
            ` : `
              <option value="-1" ${selectedLine === null ? 'selected' : ''} hidden disabled>노선 선택</option>
              ${lines.map(({ idx, name }) => `
                <option value="${idx}" ${selectedLineIdx === idx ? 'selected' : ''}>${name}</option>
              `).join('')}
            `}
          </select>
        </form>
        ${ stations.length === 0 ? `
          <div style="text-align: center; padding: 20px 0; background: #f5f5f5; border-radius: 5px; margin-top: 10px;">
            구간을 추가해주세요
          </div>
        ` : `
          <ul class="mt-3 pl-0">
            ${stations.map((station, key) => `
              <li style="list-style: none;" data-component="SectionItem" data-key="${key}" data-idx="${station.idx}"></li>            
            `).join('')}
          </ul>
        ` }
      </div>
      <div data-component="SectionEditorModal"></div>
    `;
  }

  private get $modal(): SectionEditorModal {
    return this.$components.SectionEditorModal as SectionEditorModal;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'SectionEditorModal') {
      return new SectionEditorModal(el, {
        lines: lineStore.$state.lines,
        stations: stationStore.$state.stations,
        addSection: this.addSection.bind(this),
      });
    }

    if (componentName === 'SectionItem') {
      const station = this.stations[Number(el.dataset.key)];
      return new SectionItem(el, {
        name: station.name,
        removeSection: () => this.removeSection(station.idx),
      });
    }
  }

  private async getLine(idx = this.lineIdx) {
    this.$state.line = await lineService.getLine(idx);
  }

  private async addSection(sectionRequest: SectionRequest) {
    try {
      await lineService.addLineSection(this.lineIdx, sectionRequest);
      alert('구간이 추가되었습니다.');
      this.$modal.close();
      await this.getLine();
    } catch (e) {
      alert(e.message);
    }
  }

  private async removeSection(stationIdx: number) {
    try {
      await lineService.removeSection(this.lineIdx, stationIdx);
      alert('구간이 삭제되었습니다.');
      await this.getLine();
    } catch (e) {
      alert(e.message);
    }
  }

  protected setEvent() {
    this.addEvent('click', '.modal-trigger-btn', () => {
      this.$modal.open();
    });

    this.addEvent('change', '.lineSelector', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const idx = Number(target.value);
      this.$state.selectedLineIdx = idx;
      this.getLine(idx);
    });
  }
}
