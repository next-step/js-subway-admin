import Component from "@/core/component";
import view from "./view";
import { stationService, uiService } from "@/service";
import { $, createElement } from "@/utils/dom";

interface IProps {
  id: string;
  value: string;
}

class StationUpdate extends Component<IProps> {
  protected initDom(): void {
    this.$container = createElement({
      tag: "form",
      id: "update-station",
    });
  }

  protected bindEvents(): void {
    this.$container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const input = $("#station-name", this.$container) as HTMLInputElement;
      const newName = input.value;
      if (newName === this.props.value) return;
      stationService.update(this.props.id, newName);
      uiService.closeModal();
    });
  }

  protected componentMount(): void {
    this.$container.innerHTML = view(this.props.value);
  }
}

export default StationUpdate;
