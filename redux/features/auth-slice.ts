import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  auth: AuthState;
};

type AuthState = {
  id: string;
  username: string;
  access_token: string;
};

const initialState = {
  auth: {
    id: "",
    username: "",
    access_token: "",
  } as AuthState,
} as initialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<AuthState>) => {
      return {
        auth: {
          id: action.payload?.id,
          username: action.payload?.username,
          access_token: action.payload?.access_token,
        },
      };
    },
  },
});

export const { logOut, logIn } = auth.actions;

export default auth.reducer;
