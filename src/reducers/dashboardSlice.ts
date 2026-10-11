import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const currentYear: number = new Date().getFullYear();

interface InitialStateType {
  navOpen: boolean;
  overview: {
    year: number;
    semester: 1 | 2;
  };
}
const initialState: InitialStateType = {
  navOpen: true,
  overview: {
    year: currentYear,
    semester: 1,
  },
};

const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.navOpen = !state.navOpen;
    },
    changeOverviewYear: (state, action: PayloadAction<number>) => {
      state.overview.year = action.payload;
    },
    changeOverviewSemester: (state, action: PayloadAction<1 | 2>) => {
      state.overview.semester = action.payload;
    },
  },
});

const dashboardReducer = dashboard.reducer;
export const { toggleNav, changeOverviewSemester, changeOverviewYear } =
  dashboard.actions;

export default dashboardReducer;
