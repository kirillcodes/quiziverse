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

type DataStorage = {
  accessToken: string;
  email: string;
};

export const getUserDataStorage = (): DataStorage | null => {
  const email: string | null = localStorage.getItem("email");
  const accessToken: string | null = localStorage.getItem("accessToken");

  if (accessToken && email) {
    return { accessToken, email };
  } else {
    return null;
  }
};

export const setUserDataStorage = ({ email, accessToken }: DataStorage): void => {
  localStorage.setItem("email", email);
  localStorage.setItem("accessToken", accessToken);
};

export const removeUserDataStorage = (): void => {
  localStorage.removeItem("email");
  localStorage.removeItem("accessToken");
};

export const loginUserByStorage = () => (dispatch: Dispatch) => {
  const storageData: DataStorage | null = getUserDataStorage();

  if (storageData) {
    dispatch(loginSuccess({ email: storageData.email, accessToken: storageData.accessToken }));
    return true;
  } else {
    return false;
  }
};

export const loginUser =
  (data: authRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());

      const res = await api.auth.login(data);

      dispatch(loginSuccess({ email: res.data.email, accessToken: res.data.token }));
      setUserDataStorage({ email: res.data.email, accessToken: res.data.token });
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
      dispatch(logoutSuccess());
      removeUserDataStorage();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };
