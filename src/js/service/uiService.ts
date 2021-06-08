import Component from "@/core/component";
import { uiStore } from "@/store";

const uiService = {
  openModal: (modalContents: Component, modalTitle: string): void => {
    const state = uiStore.getState();
    uiStore.updateState({
      ...state,
      isModalOpen: true,
      modalContents,
      modalTitle,
    });
  },

  closeModal: (): void => {
    const state = uiStore.getState();
    uiStore.updateState({ ...state, isModalOpen: false, modalContents: null });
  },
};

export default uiService;
