import {Component} from "~@core";
import {LineModal} from "~pages/lines/LineModal";
import '../assets/css/pages/lines.css';
import {Line} from "~@domain";
import {lineService} from "~services";
import {LineItem} from "~pages/lines/LineItem";

interface LineState {
  lines: Line[];
}

export class LinesPage extends Component<LineState> {

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
            ${lines.map(({ idx, name }, key) => `
              <li style="list-style: none" data-idx="${idx}" data-key="${key}" data-component="LineItem"></li>
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
    if (componentName === 'LineItem') {
      const line = this.$state.lines[Number(el.dataset.key)];
      return new LineItem(el, {
        name: line.name
      });
    }

    if (componentName === 'LineModal') {
      return new LineModal(el);
    }
  }

  private get $modal() {
    return this.$components.LineModal as LineModal;
  }

  protected setEvent() {
    this.addEvent('click', '.edit-line', (event: Event) => {
      this.$modal.open();
    });
  }
}
