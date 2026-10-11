import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navOpen: true,
};

const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.navOpen = !state.navOpen;
    },
  },
});

const dashboardReducer = dashboard.reducer;
export const { toggleNav } = dashboard.actions;

export default dashboardReducer;
