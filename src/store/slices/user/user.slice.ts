import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState, SetUserPayLoad } from "./user.contants";

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

export default userSlice;
