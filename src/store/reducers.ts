import { roomSlice } from "./slices/room/room.slice";
import { userSlice } from "./slices/user/user.slice";

const rootReducer = {
  [roomSlice.name]: roomSlice.reducer,
  [userSlice.name]: userSlice.reducer,
};

export default rootReducer;
