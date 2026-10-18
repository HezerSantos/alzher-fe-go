import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Categories } from "../services/dashboardService";

const currentYear: number = new Date().getFullYear();

type BudgetSectionId = string;
type BudgetSectionItemId = string;

interface Budget {
  name: string;
  grossIncome: string;
  sections: Record<BudgetSectionId, BudgetSection>;
  items: Record<BudgetSectionItemId, BudgetSectionItem>;
}

interface BudgetSection {
  name: string;
  isDeductions: boolean;
  itemIds: BudgetSectionItemId[];
}

interface BudgetSectionItem {
  categoryName: string;
  amount: string;
  sectionId: BudgetSectionId;
}

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
  budget: {
    createBudget: Budget;
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
  budget: {
    createBudget: {
      name: "My Budget",
      grossIncome: "",
      sections: {},
      items: {},
    },
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
    changeBudgetGrossIncome: (state, action: PayloadAction<string>) => {
      const value = action.payload;

      // Allow empty input so users can backspace and clear the field
      if (!value) {
        state.budget.createBudget.grossIncome = "";
        return;
      }

      // Reject values that are completely invalid numbers
      // This regex allows numbers, a single decimal point, and trailing decimals like "12."
      const validNumberRegex = /^\d*\.?\d*$/;
      if (!validNumberRegex.test(value)) {
        return;
      }

      // Save the raw string directly to the state
      state.budget.createBudget.grossIncome = value;
    },
    addBudgetSection: (state) => {
      const newBudgetSecitonId = crypto.randomUUID();
      const blankBudgetSection = {
        name: "New Section",
        isDeductions: false,
        itemIds: [],
      };

      state.budget.createBudget.sections[newBudgetSecitonId] =
        blankBudgetSection;
    },
    changeBudgetSectionName: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      const { id, name } = action.payload;

      const budgetSection = state.budget.createBudget.sections[id];
      budgetSection.name = name;
      state.budget.createBudget.sections[id] = budgetSection;
    },
    addBudgetSectionItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const newBudgetSectionItemId = crypto.randomUUID();
      const blankBudgetSectionItem = {
        categoryName: "New Category Name",
        amount: "",
        sectionId: id,
      };

      const budgetSection = state.budget.createBudget.sections[id];
      budgetSection.itemIds.push(newBudgetSectionItemId);

      state.budget.createBudget.items[newBudgetSectionItemId] =
        blankBudgetSectionItem;
    },
    changeBudgetSectionItem: (
      state,
      action: PayloadAction<{
        id: string;
        value: string;
        key: "amount" | "categoryName";
      }>,
    ) => {
      const { id, value, key } = action.payload;
      const budgetSectionItem = state.budget.createBudget.items[id];
      if (key === "amount") {
        // Allow empty input so users can backspace and clear the field
        if (!value) {
          budgetSectionItem[key] = "";
          return;
        }

        const validNumberRegex = /^\d*\.?\d*$/;
        if (!validNumberRegex.test(value)) {
          return;
        }
        budgetSectionItem[key] = value;
      } else {
        budgetSectionItem[key] = value;
      }
      state.budget.createBudget.items[id] = budgetSectionItem;
    },
    deleteBudgetSection: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const { itemIds } = state.budget.createBudget.sections[id];
      const { [id]: _, ...rest } = state.budget.createBudget.sections;
      state.budget.createBudget.sections = rest;

      const itemMap = new Map(Object.entries(state.budget.createBudget.items));
      for (const itemId of itemIds) {
        itemMap.delete(itemId);
      }
      state.budget.createBudget.items = Object.fromEntries(itemMap);
    },
    deleteBudgetSectionItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const item = state.budget.createBudget.items[id];
      const { [id]: _, ...rest } = state.budget.createBudget.items;
      state.budget.createBudget.items = rest;

      const budgetSection = state.budget.createBudget.sections[item.sectionId];
      const children = new Set(budgetSection.itemIds);
      children.delete(id);

      budgetSection.itemIds = [...children];
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
  changeBudgetGrossIncome,
  addBudgetSection,
  changeBudgetSectionName,
  addBudgetSectionItem,
  changeBudgetSectionItem,
  deleteBudgetSection,
  deleteBudgetSectionItem,
} = dashboard.actions;

export default dashboardReducer;
