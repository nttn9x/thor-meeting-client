import { userSlice } from "./slices/user/user.slice";

const rootReducer = {
  [userSlice.name]: userSlice.reducer,
};

export default rootReducer;
