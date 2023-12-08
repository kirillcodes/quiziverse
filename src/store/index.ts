import { configureStore } from "@reduxjs/toolkit/react";
import authReducer from "./auth/authReducer";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
