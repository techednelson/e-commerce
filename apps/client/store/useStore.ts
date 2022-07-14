import create, { State, StateCreator } from 'zustand';
import { IAppState, IUser } from './IAppState';
import produce, { Draft } from 'immer';

const immer =
  <T extends State>(
    config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce<T>(fn)), get, api);

const useStore = create<IAppState>(
  immer((set) => ({
    user: null,
    setUser: (user: IUser) =>
      set((state: IAppState) => {
        state.user = user;
      }),
  }))
);

export default useStore;
