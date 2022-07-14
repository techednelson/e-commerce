export interface IUser {
  id: string;
  email: string;
}

export interface IAppState {
  user: IUser;
  setUser: (user: IUser) => void;
}
