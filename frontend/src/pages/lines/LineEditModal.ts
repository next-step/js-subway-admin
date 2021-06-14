import {Component} from "@/_core";
import {colorOptions} from "@/constants";
import {LineResponse, LineRequest, StationResponse} from "subway-domain";
import {parseFormData, selectOne} from "@/utils";

interface LineEditModalState {
  visible: boolean;
  formData: LineRequest;
}

interface LineEditModalProps {
  stations: StationResponse[];
  addLine: (lineRequest: LineRequest) => void;
  updateLine: (lineRequest: LineRequest) => void;
}

const formDataInit: LineRequest = {
  name: '',
  color: '',
  upStation: 0,
  downStation: 0,
  distance: 0,
  duration: 0,
};

export class LineEditModal extends Component<LineEditModalState, LineEditModalProps> {

  protected setup() {
    this.$state = {
      visible: false,
      formData: { ...formDataInit },
    }
  }

  get lineColors(): string {
    return colorOptions
      .map((color: string, index: number) => `
          <button type="button" class="color-option bg-${color}" data-color="${color}"></button>
          ${(index + 1) % 7 === 0 ? "<br/>" : ""}
      `)
      .join("");
  }

  protected template(): string {
    const { visible, formData } = this.$state;
    const { stations } = this.$props;

    if (!visible) {
      return `<div class="modal"></div>`;
    }

    return `
      <div class="modal open">
        <div class="modal-inner p-8">
        
          <button class="modal-close">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          
          <header>
            <h2 class="text-center">🛤️ 노선 추가</h2>
          </header>
          
          <form class="lineAppender">
          
            <div class="input-control">
              <label for="subway-line-name" class="input-label" hidden>노선 이름</label>
              <input
                type="text"
                id="subway-line-name"
                name="name"
                class="input-field"
                placeholder="노선 이름"
                value="${formData.name || ''}"
                required
              />
            </div>
            
            ${ formData.idx === undefined ? `
              <div class="d-flex items-center input-control">
                <label for="up-station" class="input-label" hidden>상행역</label>
                <select id="up-station" name="upStation" class="mr-2" required>
                  <option value="" disabled hidden selected>상행역</option>
                  ${stations.map(({ name, idx }) => `
                    <option value="${idx}" ${formData?.upStation === idx ? ' selected' : ''}>${name}</option>
                  `)}
                </select>
                <label for="down-station" class="input-label" hidden>하행역</label>
                <select id="down-station" name="downStation" required>
                  <option value="" disabled hidden selected>하행역</option>
                  ${stations.map(({ name, idx }) => `
                    <option value="${idx}" ${formData?.downStation === idx ? ' selected' : ''}>${name}</option>
                  `)}
                </select>
              </div>
              
              <div class="input-control">
                <label for="distance" class="input-label" hidden>상행 하행역 거리</label>
                <input
                  type="number"
                  id="distance"
                  name="distance"
                  class="input-field mr-2"
                  placeholder="상행 하행역 거리"
                  value="${formData.distance}"
                  required
                />
                <label for="duration" class="input-label" hidden>상행 하행역 시간</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  class="input-field"
                  placeholder="상행 하행역 시간"
                  value="${formData.duration}"
                  required
                />
              </div>
            ` : '' }
            
            <div class="input-control">
              <div>
                <label for="subway-line-color" class="input-label" hidden>색상</label>
                <input
                  type="text"
                  id="subway-line-color"
                  name="color"
                  class="input-field"
                  placeholder="색상을 아래에서 선택해주세요."
                  value="${formData.color}"
                  disabled
                  required
                />
              </div>
            </div>
            
            <div class="subway-line-color-selector px-2">
              ${this.lineColors}
            </div>
            
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

  public open(line?: LineResponse) {
    this.$state.visible = true;
    this.$state.formData = line ? {
      idx: line.idx,
      name: line.name,
      color: line.color,
    } : { ...formDataInit };
  }

  public close() {
    this.$state.visible = false;
  }

  protected setEvent() {
    this.addEvent('click', '.modal-close', () => this.close());

    this.addEvent('click', '.color-option', ({ target }: Event) => {
      const frm = selectOne('form', this.$target) as HTMLFormElement;
      frm.color.value = (target as HTMLElement).dataset.color;
    });

    this.addEvent('submit', '.lineAppender', (event: Event) => {
      event.preventDefault();
      const frm = event.target as HTMLFormElement;

      if (frm.color.value.trim().length === 0) {
        return alert('색상을 선택해주세요');
      }

      frm.color.disabled = false;
      const lineRequest = Object.entries(parseFormData(frm))
                                .reduce((obj: any, [k, v]) => {
                                  obj[k] = Number(v) || v;
                                  return obj;
                                }, {}) as LineRequest;

      lineRequest.idx = this.$state.formData.idx;

      if (lineRequest.idx === undefined) {
        this.$props.addLine(lineRequest);
      } else {
        this.$props.updateLine(lineRequest);
      }
      frm.color.disabled = true;
    });
  }
}
