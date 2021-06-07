import {Component} from "~@core";

export class SectionItem extends Component {
  protected template(): string {
    return `
      <div class="d-flex items-center py-2 relative">
        <span class="w-100 pl-6">인천</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm">
          삭제
        </button>
      </div>
      <hr class="my-0" />
    `;
  }
}
