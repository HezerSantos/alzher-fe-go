import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isPopup: false,
  text: "",
  onAccept: () => {},
  onCancel: () => {},
  onAcceptText: "",
  onCancelText: "",
};
const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    clearPopup: () => initialState,
    togglePopup: (_, action: PayloadAction<typeof initialState>) => {
      return action.payload;
    },
  },
});

const popupReducer = popupSlice.reducer;
export const { clearPopup, togglePopup } = popupSlice.actions;
export default popupReducer;
