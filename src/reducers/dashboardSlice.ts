import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Categories } from "../services/dashboardService";

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
  selectedTransaction: {
    showTransaction: boolean;
    tId: string;
    category: Categories;
    description: string;
    date: string;
    amount: number;
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
  selectedTransaction: {
    showTransaction: false,
    tId: "",
    category: "",
    description: "",
    date: "",
    amount: NaN,
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
    openTransactionModal: (
      state,
      action: PayloadAction<
        Omit<InitialStateType["selectedTransaction"], "showTransaction">
      >,
    ) => {
      state.selectedTransaction = { ...action.payload, showTransaction: true };
    },
    clearTransactionModal: (state, _: PayloadAction<void>) => {
      state.selectedTransaction = initialState.selectedTransaction;
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
  openTransactionModal,
  clearTransactionModal,
} = dashboard.actions;

export default dashboardReducer;
