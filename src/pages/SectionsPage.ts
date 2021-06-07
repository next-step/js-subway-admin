import '../assets/css/pages/sections.css';
import {Component} from "~@core";
import {SectionEditorModal} from "./sections";
import {SectionItem} from "~pages/sections/SectionItem";
import {ADD_SECTION, lineStore, sectionStore, stationStore} from "~store";
import {Line, Section, SectionRequest, Station} from "~@domain";

interface SectionsPageState {
  selectedLineIdx: number;
}

export class SectionsPage extends Component<SectionsPageState> {

  protected setup() {
    this.$state = {
      selectedLineIdx: -1,
    }
  }

  private get selectedLine(): Line | null {
    const { selectedLineIdx } = this.$state;
    const { lines } = lineStore.$state;
    return lines.find(v => v.idx === selectedLineIdx) || null;
  }

  private get selectedColor(): string {
    const { selectedLine } = this;
    return selectedLine?.color || 'bg-400';
  }

  private get lineSections(): Section[] {
    const { selectedLine } = this;
    const { sections } = sectionStore.$state;
    return sections.filter(v => v.line === selectedLine?.idx);
  }

  private get sectionStations(): Station[] {
    const { lineSections } = this;
    const { stations } = stationStore.$state;
    const stationIdxSet = new Set(lineSections.flatMap(v => [ v.upStation, v.downStation ]));
    return [ ...stationIdxSet ].map(idx => stations.find(v => v.idx === idx)) as Station[];
  }

  protected template(): string {

    const { selectedColor, selectedLine, sectionStations } = this;
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
        ${ lines.length === 0 ? `
          <div style="text-align: center; padding: 20px 0; background: #f5f5f5; border-radius: 5px">
            노선을 추가해주세요
          </div>
        ` : `
          <form class="d-flex items-center pl-1">
            <label for="subway-line" class="input-label" hidden>노선</label>
            <select id="subway-line" class="bg-${selectedColor} lineSelector">
              <option value="-1" ${selectedLine === null ? 'selected' : ''} hidden disabled>노선 선택</option>
              ${lines.map(({ idx, name }) => `
                <option value="${idx}" ${selectedLineIdx === idx ? 'selected' : ''}>${name}</option>
              `).join('')}
            </select>
          </form>
          ${ sectionStations.length === 0 ? `
            <div style="text-align: center; padding: 20px 0; background: #f5f5f5; border-radius: 5px; margin-top: 10px;">
              구간을 추가해주세요
            </div>
          ` : `
            <ul class="mt-3 pl-0">
              ${sectionStations.map((station, key) => `
                <li style="list-style: none;" data-component="SectionItem" data-key="${key}" data-idx="${station.idx}"></li>            
              `).join('')}
            </ul>
          ` }
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
      const station = this.sectionStations[Number(el.dataset.key)];
      return new SectionItem(el, {
        name: station.name,
        removeSection: this.removeSection(station.idx),
      });
    }
  }

  private addSection(sectionRequest: SectionRequest) {
    try {
      sectionStore.dispatch(ADD_SECTION, sectionRequest);
      alert('구간이 추가되었습니다.');
      this.$modal.close();
    } catch (e) {
      alert(e.message);
    }
  }

  private removeSection(stationIdx: number) {

  }

  protected setEvent() {
    this.addEvent('click', '.modal-trigger-btn', () => {
      this.$modal.open();
    });

    this.addEvent('change', '.lineSelector', (event: InputEvent) => {
      const target = event.target as HTMLSelectElement;
      this.$state.selectedLineIdx = Number(target.value);
    });
  }
}
