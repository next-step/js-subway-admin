import {colorOptions} from "~constants";
import {Component} from "~@core";
import {LineModal} from "~components/modal/LineModal";

export class Lines extends Component {

  get lineColors(): string {
    return colorOptions
      .map((color: string, index: number) => `
          <button type="button" class="color-option bg-${color}"></button>
          ${(index + 1) % 7 === 0 ? "<br/>" : ""}
      `)
      .join("");
  }

  protected template(): string {
    return `
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
          <button
            type="button"
            class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2"
          >
            노선 추가
          </button>
        </div>
        <ul class="mt-3 pl-0">
          <li class="d-flex items-center py-2 relative">
            <span class="subway-line-color-dot bg-blue-400">${this.lineColors}</span>
            <span class="w-100 pl-6 subway-line-list-item-name"
              >1호선</span
            >
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1"
            >
              수정
            </button>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm"
            >
              삭제
            </button>
          </li>
          <hr class="my-0" />
        </ul>
      </div>
      <div data-component="LineModal"></div>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'LineModal') {
      return new LineModal(el);
    }
  }
}
