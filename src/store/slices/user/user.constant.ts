export interface IUserState {
  username?: string;
  password?: string;
}

export interface SetUserPayLoad {
  user?: IUserState;
}

export const initialState: IUserState | null = null;
