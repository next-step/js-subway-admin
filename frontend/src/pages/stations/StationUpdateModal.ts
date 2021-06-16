import {Component} from "@/_core";
import {StationResponse} from "subway-domain";

interface StationUpdateModalState {
  visible: boolean;
  formData: StationResponse | null;
}

interface StationUpdateModalProps {
  update: (station: StationResponse) => void;
}

export class StationUpdateModal extends Component<StationUpdateModalState, StationUpdateModalProps> {

  protected setup() {
    this.$state = {
      visible: false,
      formData: null,
    }
  }

  protected template(): string {
    const { visible, formData } = this.$state;

    return `
      <div class="modal ${visible ? 'open' : ''}">
        <div class="modal-inner p-8">
          <button class="modal-close">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <header>
            <h2 class="text-center">🖋 역 이름 수정</h2>
          </header>
          <form class="updateForm">
            <div class="input-control">
              <label for="stationName" class="input-label" hidden>역 이름</label>
              <input
                type="text"
                id="updateStationName"
                name="stationName"
                class="input-field"
                placeholder="역 이름"
                value="${formData?.name || ''}"
                required
              />
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

  public open(station: StationResponse) {
    this.$state.visible = true;
    this.$state.formData = station;
  }

  public close() {
    this.$state.visible = false;
  }

  protected setEvent() {
    this.addEvent('click', '.modal-close', () => this.close());

    this.addEvent('submit', '.updateForm', (event: Event) => {
      event.preventDefault();
      const frm = event.target as HTMLFormElement;
      this.$props.update({
        ...this.$state.formData!,
        name: frm.stationName.value,
      });
    })
  }
}
