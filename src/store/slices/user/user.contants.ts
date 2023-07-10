export interface IUserState {
  name?: string;
}

export interface SetUserPayLoad {
  user: IUserState;
}

export const initialState: IUserState = {};
