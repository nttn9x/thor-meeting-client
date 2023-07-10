import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import rootSaga from "./rootSaga";

function configureAppStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
  });

  // sagaMiddleware.run(rootSaga);

  return store;
}

const store = configureAppStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
