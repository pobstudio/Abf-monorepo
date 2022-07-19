import create from 'zustand';

type State = {
  isGenericModalOpen: boolean;
  setIsGenericModalOpen: (s: boolean) => void;
  toggleIsGenericModalOpen: () => void;
};

export const useModalStore = create<State>((set, get) => ({
  isGenericModalOpen: false,
  setIsGenericModalOpen: (s) => set({ isGenericModalOpen: s }),
  toggleIsGenericModalOpen: () =>
    set((s) => ({
      isGenericModalOpen: !s.isGenericModalOpen,
    })),
}));
