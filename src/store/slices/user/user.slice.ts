import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@thor/store";

import { initialState, SetUserPayLoad } from "./user.constant";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayLoad>) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice;
