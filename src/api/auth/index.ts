import { Endpoints } from "@api/endpoints";
import { axiosInstance } from "@api/instance";

type authRequest = {
  email: string;
  password: string;
};

export const login = (params: authRequest) => {
  return axiosInstance.post(Endpoints.AUTH.LOGIN, params);
};

export const register = (params: authRequest) => {
  return axiosInstance.post(Endpoints.AUTH.REGISTER, params);
};

export const logout = () => {
  return axiosInstance.post(Endpoints.AUTH.LOGOUT);
};
