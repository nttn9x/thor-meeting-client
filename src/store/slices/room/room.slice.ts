import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@thor/store";

import { initialState, SetUserPayLoad } from "./room.constant";

export const roomSlice = createSlice({
  name: "room",
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

export const { setUser } = roomSlice.actions;

export const selectUser = (state: RootState) => state.room;

export default roomSlice;
