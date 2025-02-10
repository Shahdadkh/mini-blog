import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  auth: AuthState;
};

type AuthState = {
  id: string;
  uuid: string;
  username: string;
  role: string;
  access_token: string;
};

const initialState = {
  auth: {
    id: "",
    uuid: "",
    username: "",
    role: "",
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
          uuid: action.payload?.uuid,
          username: action.payload?.username,
          role: action.payload?.role,
          access_token: action.payload?.access_token,
        },
      };
    },
  },
});

export const { logOut, logIn } = auth.actions;

export default auth.reducer;
