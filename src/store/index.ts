import { configureStore } from "@reduxjs/toolkit/react";
import authReducer from "./authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
