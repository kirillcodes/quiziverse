import { Dispatch } from "@reduxjs/toolkit";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./authReducer";
import api from "@api";

type authRequest = {
  email: string;
  password: string;
};

type ApiResponse = {
  data: {
    message: string;
  };
};

export const loginUser =
  (data: authRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());

      const res = await api.auth.login(data);

      dispatch(loginSuccess(res.data));
    } catch (error) {
      if (error instanceof Error) {
        const message = (error as { response?: ApiResponse }).response?.data.message;
        dispatch(loginFailure(message || "An error occurred"));
      }
    }
  };

export const registerUser =
  (data: authRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(registerStart());

      await api.auth.register(data);

      dispatch(registerSuccess());
    } catch (error) {
      if (error instanceof Error) {
        const message = (error as { response?: ApiResponse }).response?.data.message;
        dispatch(registerFailure(message || "An error occurred"));
      }
    }
  };

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      // await api.auth.logout();
      dispatch(logoutSuccess());
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };
