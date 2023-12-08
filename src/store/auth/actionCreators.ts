import { Dispatch } from "@reduxjs/toolkit";
import { loginFailure, loginStart, loginSuccess } from "./authReducer";
import api from "@api";

type LoginRequest = {
  login: string;
  password: string;
};

export const loginUser = (data: LoginRequest) => {
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());

      const res = await api.auth.login(data);

      dispatch(loginSuccess(res.data.accessToken));
    } catch (e) {
      if (e instanceof Error) {
        dispatch(loginFailure(e.message));
      }
    }
  };
};
