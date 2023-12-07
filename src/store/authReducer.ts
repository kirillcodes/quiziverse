import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthStateTypes = {
  authData: {
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
  authData: {
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
    loginStart: (state): AuthStateTypes => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true,
      },
    }),
    loginSuccess: (state, action: PayloadAction<string>): AuthStateTypes => ({
      ...state,
      authData: {
        accessToken: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    loginFailure: (state, action: PayloadAction<string>): AuthStateTypes => ({
      ...state,
      authData: {
        ...state.authData,
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
    loadProfileSuccess: (
      state,
      action: PayloadAction<string>
    ): AuthStateTypes => ({
      ...state,
      profileData: {
        profile: action.payload,
        isLoading: false,
        error: action.payload,
      },
    }),
    loadProfileFailure: (
      state,
      action: PayloadAction<string>
    ): AuthStateTypes => ({
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
  loginStart,
  loginSuccess,
  loginFailure,
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
  logoutSuccess,
} = authReducer.actions;

export default authReducer.reducer;
