import { configureStore } from "@reduxjs/toolkit/react";
import logger from "redux-logger";
import { coursesApi } from "./api/coursesApi";
import { authApi } from "./api/authApi";
import { testsApi } from "./api/testsApi";
import { usersApi } from "./api/usersApi";

export const store = configureStore({
  reducer: {
    [coursesApi.reducerPath]: coursesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [testsApi.reducerPath]: testsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      logger,
      coursesApi.middleware,
      authApi.middleware,
      testsApi.middleware,
      usersApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
