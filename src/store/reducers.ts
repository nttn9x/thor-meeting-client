import { userSlice } from "./slices/user/user.slice";
import { api as roomApi } from "./slices/room/room.slice";

const rootReducer = {
  [userSlice.name]: userSlice.reducer,
  [roomApi.reducerPath]: roomApi.reducer,
};

export default rootReducer;
