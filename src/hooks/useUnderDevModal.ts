import { create } from 'zustand';

interface underDevModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUnderDevModal = create<underDevModal>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  }
}));

export default useUnderDevModal;
