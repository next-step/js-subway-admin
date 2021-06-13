import {Component} from "@/_core";
import {LineResponse, SectionRequest, StationResponse} from "subway-domain";
import {parseFormData} from "@/utils";

interface SectionEditorModalState {
  visible: boolean;
  selectedLineIdx: number;
}

interface SectionEditorModalProps {
  addSection: (sectionRequest: SectionRequest) => void;
  lines: LineResponse[];
  stations: StationResponse[];
}

export class SectionEditorModal extends Component<SectionEditorModalState, SectionEditorModalProps> {

  protected setup() {
    this.$state = {
      visible: false,
      selectedLineIdx: -1,
    }
  }

  private get selectedLine(): LineResponse | null {
    const { selectedLineIdx } = this.$state;
    const { lines } = this.$props;
    return lines.find(v => v.idx === selectedLineIdx) || null;
  }

  protected template(): string {
    const {selectedLine} = this;
    const {visible, selectedLineIdx} = this.$state;
    const {lines, stations} = this.$props;

    return `
      <div class="modal ${visible ? 'open' : ''}">
        <div class="modal-inner p-8">
        
          <button class="modal-close">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          
          <header>
            <h2 class="text-center">🔁 구간 추가</h2>
          </header>
          
          <form class="sectionAppender">
          
            <div class="input-control">
              <label for="subway-line-for-section" class="input-label" hidden>노선</label>
              <select id="subway-line-for-section" name="line" class="sectionAppenderLineSelector" required>
                <option value="" ${selectedLine === null ? 'selected' : ''} disabled hidden>노선 선택</option>
                ${lines.map(({ idx, name }) => `
                  <option value="${idx}" ${selectedLineIdx === idx ? 'selected' : ''}>${name}</option>
                `).join('')}
              </select>
            </div>
            
            ${selectedLine === null ? `
              <div style="text-align: center; margin: 10px 0;">
                노선을 선택해주세요
              </div>
            ` : `
              
              <div class="d-flex items-center input-control">
              
                <label for="up-station" class="input-label" hidden>상행역</label>
                <select id="up-station" name="upStation" required>
                  <option value="" selected disabled hidden>상행역</option>
                  ${stations.map(({ idx, name }) => `
                    <option value="${idx}">${name}</option>
                  `).join('')}
                </select>
                
                <div class="d-inline-block mx-3 text-2xl">➡️</div>
                
                <label for="down-station" class="input-label" hidden>하행역</label>
                <select id="down-station" name="downStation" required>
                  <option value="" selected disabled hidden>하행역</option>
                  ${stations.map(({ idx, name }) => `
                    <option value="${idx}">${name}</option>
                  `).join('')}
                </select>
                
              </div>
            `}
            
            <div class="d-flex justify-end mt-3">
              <button type="submit" name="submit" class="input-submit bg-cyan-300">
                확인
              </button>
            </div>
            
          </form>
          
        </div>
      </div>
    `;
  }

  public open() {
    this.$state.visible = true;
  }

  public close() {
    this.$state.visible = false;
  }

  protected setEvent() {
    this.addEvent('click', '.modal-close', () => this.close());

    this.addEvent('change', '.sectionAppenderLineSelector', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      this.$state.selectedLineIdx = Number(target.value);
    });

    this.addEvent('submit', '.sectionAppender', (event: Event) => {
      event.preventDefault();
      const frm = event.target as HTMLFormElement;
      const sectionRequest = Object.entries(parseFormData(frm))
                                   .reduce((obj: any, [k, v]) => {
                                     obj[k] = Number(v);
                                     return obj;
                                   }, {}) as SectionRequest;

      this.$props.addSection(sectionRequest);
    });
  }
}
