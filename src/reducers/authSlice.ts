import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuthorized: false,
  email: "",
  id: "",
  token: "",
  expiresAt: 0,
  issuedAt: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        email: string;
        id: string;
        token: string;
        expiresAt: number;
        issuedAt: number;
      }>,
    ) => {
      state.isAuthorized = true;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
      state.issuedAt = action.payload.issuedAt;
    },
    logout: (state, _: PayloadAction<undefined>) => {
      ((state.isAuthorized = false), (state.email = ""), (state.id = ""));
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
