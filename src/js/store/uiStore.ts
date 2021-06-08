import Store from "@/core/store";
import Component from "@/core/component";

interface IState {
  isModalOpen: boolean;
  modalContents: Component | null;
  modalTitle: string;
}

class UIStore extends Store<IState> {
  protected initState(): void {
    this.state = { isModalOpen: false, modalContents: null, modalTitle: "" };
  }
}

const uiStore = new UIStore();
export default uiStore;
