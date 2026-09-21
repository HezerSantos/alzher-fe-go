import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  baseUrl: "",
};

interface BootInterface {
  baseUrl: string;
}
const bootSlice = createSlice({
  name: "boot",
  initialState,
  reducers: {
    setBoot: (_, action: PayloadAction<BootInterface>) => {
      return action.payload;
    },
  },
});

export default bootSlice.reducer;

export const { setBoot } = bootSlice.actions;
