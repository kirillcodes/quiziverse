import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthStateTypes = {
  registerData: {
    registered: boolean;
    isLoading: boolean;
    error: string | null;
  };
  loginData: {
    id: number | null;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
  };
};

const initialState: AuthStateTypes = {
  registerData: {
    registered: false,
    isLoading: false,
    error: null,
  },
  loginData: {
    id: null,
    accessToken: null,
    isLoading: false,
    error: null,
  },
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart: (state): AuthStateTypes => ({
      ...state,
      registerData: {
        ...state.registerData,
        isLoading: true,
      },
    }),
    registerSuccess: (state): AuthStateTypes => ({
      ...state,
      registerData: {
        registered: true,
        isLoading: false,
        error: null,
      },
    }),
    registerFailure: (state, action: PayloadAction<string>): AuthStateTypes => ({
      ...state,
      registerData: {
        registered: false,
        isLoading: false,
        error: action.payload,
      },
    }),
    loginStart: (state): AuthStateTypes => ({
      ...state,
      loginData: {
        ...state.loginData,
        isLoading: true,
      },
    }),
    loginSuccess: (
      state,
      action: PayloadAction<{ id: number; accessToken: string }>
    ): AuthStateTypes => ({
      ...state,
      loginData: {
        id: action.payload.id,
        accessToken: action.payload.accessToken,
        isLoading: false,
        error: null,
      },
    }),
    loginFailure: (state, action: PayloadAction<string>): AuthStateTypes => ({
      ...state,
      loginData: {
        ...state.loginData,
        isLoading: false,
        error: action.payload,
      },
    }),
    logoutSuccess: (): AuthStateTypes => ({ ...initialState }),
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} = authReducer.actions;

export default authReducer.reducer;
