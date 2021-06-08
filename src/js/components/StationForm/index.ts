import Component from "@/core/component";
import view from "./view";
import { stationService } from "@/service";
import { $, createElement } from "@/utils/dom";

class StationForm extends Component {
  protected initDom(): void {
    this.$container = createElement({
      tag: "form",
      className: "form",
      id: "station-form",
    });
  }

  protected componentMount(): void {
    this.$container.innerHTML = view;
  }

  protected bindEvents(): void {
    this.$container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const name = $("#station-name", this.$container) as HTMLInputElement;
      stationService.add(name.value);
      name.value = "";
    });
  }

  public render(): void {
    this.$root.appendChild(this.$container);
    this.componentMount();
  }
}

export default StationForm;
