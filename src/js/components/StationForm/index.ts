import Component from "@/core/component";
import view from "./view";
import stationService from "@/service/stationService";
import { $, createElement } from "@/utils/dom";

class StationForm extends Component {
  protected componentMount(): void {
    this.$container.innerHTML = view;
  }

  public bindEvents(): void {
    this.$container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const name = $("#station-name", this.$container) as HTMLInputElement;
      stationService.add(name.value);
      name.value = "";
    });
  }

  public render(): void {
    this.$container = createElement({
      tag: "form",
      className: "form",
      id: "station-form",
    });
    this.$root.appendChild(this.$container);
    this.componentMount();
    this.bindEvents();
  }
}

export default StationForm;
