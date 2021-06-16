import {Component} from "@/_core";

interface LineItemProps {
  name: string;
  color: string;
  editLine: () => void;
  removeLine: () => void;
}

export class LineItem extends Component<{}, LineItemProps> {

  protected template(): string {
    const { name, color } = this.$props;
    return `
      <div class="d-flex items-center py-2 relative">
        <span class="subway-line-color-dot bg-${color}"></span>
        <span class="w-100 pl-6 subway-line-list-item-name">${name}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 edit">
          수정
        </button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm remove">
          삭제
        </button>
      </div>
      <hr class="my-0" />
    `;
  }

  protected setEvent() {
    this.addEvent('click', '.edit', () => {
      this.$props.editLine();
    });

    this.addEvent('click', '.remove', () => {
      if (confirm('정말로 삭제하시겠습니까?')) {
        this.$props.removeLine();
      }
    });
  }

}
