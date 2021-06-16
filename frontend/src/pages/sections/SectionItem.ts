import {Component} from "@/_core";

interface SectionItemProps {
  name: string;
  removeSection: () => void;
}

export class SectionItem extends Component<{}, SectionItemProps> {

  protected template(): string {
    const { name } = this.$props;
    return `
      <div class="d-flex items-center py-2 relative">
        <span class="w-100 pl-6">${name}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm remove">
          삭제
        </button>
      </div>
      <hr class="my-0" />
    `;
  }

  protected setEvent() {
    this.addEvent('click', '.remove', () => {
      if (confirm('정말로 삭제하시겠습니까?')) {
        this.$props.removeSection();
      }
    })
  }

}
