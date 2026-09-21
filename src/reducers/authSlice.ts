import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuthorized: false,
  email: "",
  id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; id: string }>) => {
      state.isAuthorized = true;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout: (state, _: PayloadAction<undefined>) => {
      ((state.isAuthorized = false), (state.email = ""), (state.id = ""));
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
