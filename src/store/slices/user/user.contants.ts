export interface IUserState {
  name?: string;
  video?: boolean;
  audio?: boolean;
}

export interface SetUserPayLoad {
  user: IUserState;
}

export const initialState: IUserState = {};
