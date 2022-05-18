import create from 'zustand';
import produce from 'immer';

type State = {
  balanceMap: { [address: string]: string };
  blockNumber: number | undefined;
  setBalance: (address: string, balance: string) => void;
  setBlockNumber: (blockNumber?: number) => void;
};

export const useBlockchainStore = create<State>((set) => ({
  balanceMap: {},
  blockNumber: undefined,
  setBalance: (address: string, balance: string) => {
    set(
      produce((update) => {
        update.balanceMap[address] = balance;
      }),
    );
  },
  setBlockNumber: (blockNumber?: number) => set({ blockNumber }),
}));
