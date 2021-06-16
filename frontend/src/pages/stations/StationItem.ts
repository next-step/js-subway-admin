import {Component} from "@/_core";

interface StationItemsProps {
  name: string;
  editStation: () => void;
  removeStation: () => void;
}

export class StationItem extends Component<{}, StationItemsProps> {

  protected template(): string {
    return `
      <div class="station-list-item d-flex items-center py-2">
        <span class="w-100 pl-2">${this.$props.name}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 update">
          수정
        </button>
        <button type="button" class="bg-gray-50 text-gray-500 delete">
          삭제
        </button>          
      </div>
      <hr class="my-0" />
    `;
  }

  protected setEvent() {

    this.addEvent('click', '.update', (event: Event) => {
      event.preventDefault();
      this.$props.editStation();
    });

    this.addEvent('click', '.delete', (event: Event) => {
      event.preventDefault();

      if (confirm('정말로 삭제하시겠습니까?')) {
        this.$props.removeStation();
      }
    });

  }
}
