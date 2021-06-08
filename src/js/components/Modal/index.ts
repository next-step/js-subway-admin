import Component from "@/core/component";
import { uiStore } from "@/store";
import { uiService } from "@/service";
import { $ } from "@/utils/dom";

class Modal extends Component {
  $innerContainer: HTMLElement;
  $titleContainer: HTMLElement;

  protected initDom(): void {
    this.$container = $("#modal");
    this.bindEvents();
  }

  protected bindEvents(): void {
    this.$container.addEventListener("click", (e: Event) => {
      if (!this.$container.classList.contains("open")) return;
      const target = e.target as HTMLElement;
      const id = target.id;
      if (id !== "modal" && id !== "modal-close") return;
      uiService.closeModal();
    });
  }

  protected componentMount(): void {
    const { isModalOpen, modalContents, modalTitle } = uiStore.getState();
    this.$innerContainer = $("#modal-contents", this.$container);
    this.$titleContainer = $("#modal-title", this.$container);

    if (isModalOpen) {
      this.$container.classList.add("open");
      this.$titleContainer.innerText = modalTitle;
      modalContents.render(this.$innerContainer);
    } else {
      this.$container.classList.remove("open");
      this.$innerContainer.innerHTML = "";
    }
  }
}

export default Modal;
