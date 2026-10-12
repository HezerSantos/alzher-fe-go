import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const currentYear: number = new Date().getFullYear();

interface InitialStateType {
  navOpen: boolean;
  overview: {
    year: number;
    semester: 1 | 2;
  };
  activity: {
    categoryFilter: string;
    keyWord: string;
    keyWordLoading: boolean;
    pageSize: number;
    page: number;
  };
}
const initialState: InitialStateType = {
  navOpen: true,
  overview: {
    year: currentYear,
    semester: 1,
  },
  activity: {
    categoryFilter: "",
    keyWord: "",
    keyWordLoading: false,
    page: 1,
    pageSize: 10,
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
    setKeyWord: (state, action: PayloadAction<string>) => {
      state.activity.keyWord = action.payload;
    },
    setKeyWordLoading: (state, action: PayloadAction<boolean>) => {
      state.activity.keyWordLoading = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.activity.categoryFilter = action.payload;
    },
    incrementPage: (state, _: PayloadAction<void>) => {
      state.activity.page = state.activity.page + 1;
    },
    decrementPage: (state, _: PayloadAction<void>) => {
      state.activity.page = state.activity.page - 1;
    },
  },
});

const dashboardReducer = dashboard.reducer;
export const {
  toggleNav,
  changeOverviewSemester,
  changeOverviewYear,
  setKeyWord,
  setCategoryFilter,
  setKeyWordLoading,
  incrementPage,
  decrementPage,
} = dashboard.actions;

export default dashboardReducer;
