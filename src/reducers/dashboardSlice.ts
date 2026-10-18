import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Categories } from "../services/dashboardService";
import type { Budget as RawBudget } from "../services/dashboardService";
const currentYear: number = new Date().getFullYear();

type BudgetSectionId = string;
type BudgetSectionItemId = string;

export interface Budget {
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
    selectedBudgetId: string;
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
    selectedBudgetId: "",
    createBudget: {
      name: "My Budget",
      grossIncome: "",
      sections: {
        [crypto.randomUUID()]: {
          isDeductions: true,
          name: "Deductions",
          itemIds: [],
        },
      },
      items: {},
    },
  },
};

const formatBudgetAmount = (rawValue: string) => {
  // Validate the raw number string (allows digits and a single decimal point)
  const validNumberRegex = /^\d*\.?\d*$/;
  if (!validNumberRegex.test(rawValue)) {
    return;
  }

  // Split integer and decimal parts to format with commas safely
  const [integer, decimal] = rawValue.split(".");
  const formattedInteger = integer
    ? Number(integer).toLocaleString("en-US")
    : "";

  // Recombine with decimal if present (preserves trailing dots like "12.")
  const finalValue =
    decimal !== undefined ? `${formattedInteger}.${decimal}` : formattedInteger;
  return finalValue;
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
      const rawValue = action.payload.replace(/,/g, "");

      // Allow empty input
      if (!rawValue) {
        state.budget.createBudget.grossIncome = "";
        return;
      }
      const finalValue = formatBudgetAmount(rawValue);
      if (finalValue === undefined) {
        return;
      }
      state.budget.createBudget.grossIncome = finalValue;
    },
    changeBudgetName: (state, action: PayloadAction<string>) => {
      state.budget.createBudget.name = action.payload;
    },
    addBudgetSection: (state) => {
      const newBudgetSecitonId = crypto.randomUUID();
      const blankBudgetSection = {
        name: "",
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
        categoryName: "",
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
        const rawValue = value.replace(/,/g, "");
        if (!rawValue) {
          budgetSectionItem[key] = "";
          return;
        }

        const finalValue = formatBudgetAmount(rawValue);
        if (finalValue === undefined) {
          return;
        }
        budgetSectionItem[key] = finalValue;
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
    initiateBudget: (state, action: PayloadAction<RawBudget>) => {
      const { name, grossIncome, budgetSections } = action.payload;
      const budget: Budget = {
        name,
        grossIncome: String(grossIncome),
        sections: {},
        items: {},
      };

      for (const sectionMeta of budgetSections) {
        const section: BudgetSection = {
          name: sectionMeta.name,
          isDeductions: sectionMeta.isDeductions,
          itemIds: [],
        };

        for (const itemMeta of sectionMeta.budgetSectionItems) {
          section.itemIds.push(itemMeta.id);
          const item: BudgetSectionItem = {
            categoryName: itemMeta.categoryName,
            amount: String(itemMeta.amount),
            sectionId: sectionMeta.id,
          };
          budget.items[itemMeta.id] = item;
        }
        budget.sections[sectionMeta.id] = section;
      }

      state.budget.createBudget = budget;
    },
    setSelectedBudgetId: (state, action: PayloadAction<string>) => {
      state.budget.selectedBudgetId = action.payload;
    },
    clearBudget: (state) => {
      state.budget.createBudget = initialState.budget.createBudget;
      state.budget.selectedBudgetId = initialState.budget.selectedBudgetId;
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
  changeBudgetName,
  addBudgetSection,
  changeBudgetSectionName,
  addBudgetSectionItem,
  changeBudgetSectionItem,
  deleteBudgetSection,
  deleteBudgetSectionItem,
  initiateBudget,
  setSelectedBudgetId,
  clearBudget,
} = dashboard.actions;

export default dashboardReducer;
