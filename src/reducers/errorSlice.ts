import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notFound: false,
};
const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setNotFound: (state) => {
      state.notFound = true;
    },
    clearErrors: () => initialState,
  },
});

const errorReducer = errorSlice.reducer;
export const { setNotFound, clearErrors } = errorSlice.actions;
export default errorReducer;
