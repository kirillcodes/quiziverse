import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthStateTypes = {
  registerData: {
    registered: boolean;
    isLoading: boolean;
    error: string | null;
  };
  loginData: {
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
  };
  profileData: {
    profile: string | null;
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
    accessToken: null,
    isLoading: false,
    error: null,
  },
  profileData: {
    profile: null,
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
    loginSuccess: (state, action: PayloadAction<string>): AuthStateTypes => ({
      ...state,
      loginData: {
        accessToken: action.payload,
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
    loadProfileStart: (state): AuthStateTypes => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: true,
      },
    }),
    loadProfileSuccess: (state, action: PayloadAction<string>): AuthStateTypes => ({
      ...state,
      profileData: {
        ...state.profileData,
        profile: action.payload,
        isLoading: false,
      },
    }),
    loadProfileFailure: (state, action: PayloadAction<string>): AuthStateTypes => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: false,
        error: action.payload,
      },
    }),
    logoutSuccess: (): AuthStateTypes => initialState,
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
  logoutSuccess,
} = authReducer.actions;

export default authReducer.reducer;
