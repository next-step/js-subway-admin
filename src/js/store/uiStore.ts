import Store from "@/core/store";
import Component from "@/core/component";

interface IState {
  isModalOpen: boolean;
  modalContents: Component | null;
  modalTitle: string;
}

class UIStore extends Store<IState> {}

const uiStore = new UIStore({
  isModalOpen: false,
  modalContents: null,
  modalTitle: "",
});
export default uiStore;
