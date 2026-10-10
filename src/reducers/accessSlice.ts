import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AccessState {
  toastType: "login" | "signup" | "";
  isShared: boolean;
  toastMessage: string;
  color: "red" | "green";
}
const initialState: AccessState = {
  toastType: "",
  isShared: false,
  toastMessage: "",
  color: "green",
};

const accessSlice = createSlice({
  name: "access",
  initialState,
  reducers: {
    setToast: (
      state,
      action: PayloadAction<{
        toastType: "login" | "signup" | "";
        isShared: boolean;
        toastMessage: string;
        color: "red" | "green";
      }>,
    ) => {
      state.toastType = action.payload.toastType;
      state.isShared = action.payload.isShared;
      state.toastMessage = action.payload.toastMessage;
      state.color = action.payload.color;
    },
    clearToast: () => initialState,
  },
});

const accessReducer = accessSlice.reducer;
export const { setToast, clearToast } = accessSlice.actions;
export default accessReducer;
