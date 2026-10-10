import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isToast: false,
  message: "",
  color: "green" as "red" | "green",
};
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (
      state,
      action: PayloadAction<{ msg: string; error: boolean }>,
    ) => {
      state.isToast = true;
      state.message = action.payload.msg;
      if (action.payload.error) {
        state.color = "red";
      } else {
        state.color = "green";
      }
    },
    clearToast: () => initialState,
  },
});

const toastReducer = toastSlice.reducer;

export const { setToast, clearToast } = toastSlice.actions;
export default toastReducer;
