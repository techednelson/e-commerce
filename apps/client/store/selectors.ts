import { IAppState } from './IAppState';

export const userSelector = (state: IAppState) => ({
  user: state.user,
  setUser: state.setUser,
});
