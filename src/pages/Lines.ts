import {Component} from "~@core";
import {LineModal} from "~components/modal/LineModal";
import '../assets/css/pages/lines.css';
import {Line} from "~@domain";
import {lineService} from "~services";

interface LineState {
  lines: Line[];
}

export class Lines extends Component<LineState> {

  protected setup() {
    this.$state = {
      lines: lineService.getLines(),
    }
  }

  protected template(): string {
    const { lines } = this.$state;
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
            ${lines.map(({ idx, name }) => `
              <li style="list-style: none" data-idx="${idx}">
                <div class="d-flex items-center py-2 relative">
                  <span class="subway-line-color-dot bg-blue-400"></span>
                  <span class="w-100 pl-6 subway-line-list-item-name">${name}</span>
                  <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1">
                    수정
                  </button>
                  <button type="button" class="bg-gray-50 text-gray-500 text-sm">
                    삭제
                  </button>
                </div>
                <hr class="my-0" />
              </li>
            `).join('')}
          </ul>
        ` : `
          <div>등록된 노선이 없습니다. 노선을 추가해주세요.</div>
        ` }
      </div>
      <div data-component="LineModal"></div>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'LineModal') {
      return new LineModal(el);
    }
  }

  protected setEvent() {
    this.addEvent('click', '.edit-line', (event: Event) => {
      (this.$components.LineModal as LineModal).open();
    });
  }
}
