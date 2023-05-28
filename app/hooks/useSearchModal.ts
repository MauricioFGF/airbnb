import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  isStep: number;
  onOpen: () => void;
  onClose: () => void;
  onStep: (value: any) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  isStep: 0,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onStep: (value: any) => set({ isStep: value || 0, isOpen: true }),
}));

export default useSearchModal;
