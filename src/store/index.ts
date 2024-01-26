import { configureStore } from "@reduxjs/toolkit/react";
import logger from "redux-logger";
import { coursesApi } from './api/coursesApi';
import { authApi } from './api/authApi';

export const store = configureStore({
  reducer: {
    [coursesApi.reducerPath]: coursesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, coursesApi.middleware, authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

