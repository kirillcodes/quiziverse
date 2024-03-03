import { configureStore } from "@reduxjs/toolkit/react";
import logger from "redux-logger";
import { coursesApi } from './api/coursesApi';
import { authApi } from './api/authApi';
import { testsApi } from "./api/testsApi";

export const store = configureStore({
  reducer: {
    [coursesApi.reducerPath]: coursesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [testsApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, coursesApi.middleware, authApi.middleware, testsApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

