import {Component} from "~@core";

interface LineItemProps {
  name: string;
}

export class LineItem extends Component<{}, LineItemProps> {

  protected template(): string {
    return `
      <div class="d-flex items-center py-2 relative">
        <span class="subway-line-color-dot bg-blue-400"></span>
        <span class="w-100 pl-6 subway-line-list-item-name">${this.$props.name}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1">
          수정
        </button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm">
          삭제
        </button>
      </div>
      <hr class="my-0" />
    `;
  }


}
