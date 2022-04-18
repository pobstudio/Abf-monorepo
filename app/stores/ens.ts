import produce from 'immer';
import create from 'zustand';

type State = {
  addressToEnsMap: { [address: string]: string };
  setEns: (address: string, ens: string) => void;
};

export const useEnsStore = create<State>((set) => ({
  addressToEnsMap: {},
  setEns: (address: string, name: string) => {
    set(
      produce((update) => {
        update.addressToEnsMap[address] = name;
      }),
    );
  },
}));
