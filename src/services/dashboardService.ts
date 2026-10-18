import { api } from "./apiService";

export interface TransactionItem {
  transactionId: string;
  category: Categories;
  description: string;
  transactionDate: string;
  transactionAmount: string;
}

interface Transaction {
  id: string;
  category: string;
  description: string;
  amount: number;
  day: number;
  month: string;
  year: number;
  userId: string;
  statementId: string;
}

interface GetActivityRequestParams {
  pageSize: number;
  page: number;
  categoryFilter?: string;
  keyWord?: string;
}

interface GetActivityResponse {
  transactionData: TransactionItem[];
  previousPageFlag: boolean;
  nextPageFlag: boolean;
}

interface METHODActivityURI {
  id: string; //transaction id
}
interface DeleteActivityResponse {
  transaction: Transaction;
}

export type Categories =
  | ""
  | "Dining"
  | "Merchandise"
  | "Entertainment"
  | "Grocery"
  | "Transportation"
  | "Subscriptions"
  | "Bills";

interface UpdateActivityBody {
  category?: Categories;
  description?: string;
  amount?: number;
  transactionDate?: string;
}

type UpdateActivityReqest = METHODActivityURI & UpdateActivityBody;

interface UpdateActivityResponse {
  transaction: Transaction;
  updatedTransaction?: Transaction | null;
  updatedMap: Record<string, any>;
}

interface DashboardAnalyticsInfo {
  header: string;
  amountSpent: number | null;
  primarySubHeader: string | null;
  primarySubValue: string | null;
  secondarySubHeader: string | null;
  secondarySubValue: string | null;
}

interface YearlyData {
  year: number;
  total: number;
}

interface CategoryData {
  category: string;
  "Yearly Average": number;
  "Monthly Average": number;
  "Daily Average": number;
  total: number;
}

interface OverviewData {
  month: string;
  [year: string]: string | number;
}

interface ScatterData {
  dateOfMonth: number;
  dailyAverage: number;
}

interface GetAnalyticsResponse {
  dashboardAnalyticsInfo: DashboardAnalyticsInfo[] | null;
  yearlyData: YearlyData[] | null;
  categoryData: CategoryData[] | null;
  overviewData: OverviewData[] | null;
  scatterData: ScatterData[] | null;
}

interface GetOverviewRequest {
  year: number;
  semester: 1 | 2;
}

interface OverviewDetailsItem {
  header: string;
  price: string | number;
  details?: {
    heading: string;
    value: string;
  }[];
}

interface OverviewChartData {
  month: string;
  [year: string]: string | number;
}

interface MonthItem {
  month: string;
  year: string;
  highestCategory: string;
  lowestCategory: string;
  totalSpent: string;
}

export interface CategoryOverview {
  name: string;
  amount: number;
  totalTransactions: number;
  percent: number;
}

interface GetOverviewResponse {
  year: string;
  semester: number;
  overviewDetailsItems: OverviewDetailsItem[];
  chartData: OverviewChartData[] | null;
  monthItems: MonthItem[] | null;
  yearList: number[];
  categoryOverview: CategoryOverview[];
  callResults?: Record<string, unknown>;
}

interface AITransaction {
  postDate: string;
  description: string;
  amount: number;
}

interface AlzherMLTransaction {
  month: string;
  day: number;
  year: number;
  description: string;
  price: number;
  category: string;
}

interface AITransactionsRequest {
  files: File[];
}

interface AITransactionsResponse {
  transactions: Record<string, AITransaction[]>;
  predictedTransactions: Record<string, AlzherMLTransaction[]>;
  callResults?: Record<string, unknown>;
}

interface GetSettingsResponse {
  email: string;
  callResults?: Record<string, unknown>;
}

interface PatchUserEmailRequest {
  newEmail: string;
  password: string;
}

interface PatchUserEmailResponse {
  callResults?: Record<string, unknown>;
}

interface PatchUserPasswordRequest {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

interface PatchUserPasswordResponse {
  callResults?: Record<string, unknown>;
}

interface Budget {
  id: string;
  name: string;
  userId: string;
  grossIncome: number;
  budgetSections: BudgetSection[];
  isActive: boolean;
}

interface BudgetSection {
  id: string;
  name: string;
  budgetId: string;
  isDeductions: boolean;
  budgetSectionItems: BudgetSectionItem[];
}

interface BudgetSectionItem {
  id: string;
  budgetSectionId: string;
  categoryName: string;
  amount: number;
}

interface GetAllBudgetsResponse {
  budgets: Budget[];
}

interface BudgetByIdRequest {
  id: string;
}
interface GetBudgetByIdResponse {
  budget: Budget;
}

type CreateBudgetResponse = GetBudgetByIdResponse;

interface CreateBudgetRequest {
  name: string;
  grossIncome: number;
  budgetSections: BudgetSectionRequest[];
}

interface BudgetSectionRequest {
  name: string;
  isDeductions: boolean;
  budgetSectionItems: BudgetSectionItemRequest[];
}

interface BudgetSectionItemRequest {
  categoryName: string;
  amount: number;
}

interface ActivateBudgetResponse {
  activeBudget: Budget;
  inactiveBudget: Budget;
}

interface DeleteBudgetByIdResponse {
  deletedBudget: Budget;
}

interface UpdateBudgetResponse {
  updatedBudget: Budget;
  staleBudget: Budget;
}

interface UpdateBudgetRequest {
  id: string;
  budget: Budget;
}

const dashboard = api.injectEndpoints({
  endpoints: (builder) => ({
    getActivity: builder.query<GetActivityResponse, GetActivityRequestParams>({
      query: ({ page, pageSize, keyWord, categoryFilter }) => {
        const params: GetActivityRequestParams = {
          page,
          pageSize,
        };

        if (keyWord !== "" || keyWord !== undefined) {
          params["keyWord"] = keyWord;
        }
        if (categoryFilter !== "" || categoryFilter !== undefined) {
          params["categoryFilter"] = categoryFilter;
        }
        return {
          url: "/dashboard/activity",
          params,
        };
      },
      providesTags: ["MutateTransaction"],
    }),
    deleteTransactiopn: builder.mutation<
      DeleteActivityResponse,
      METHODActivityURI
    >({
      query: ({ id }) => ({
        url: `/dashboard/activity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MutateTransaction"],
    }),
    updateTransaction: builder.mutation<
      UpdateActivityResponse,
      UpdateActivityReqest
    >({
      query: ({ id, category, description, amount, transactionDate }) => {
        const body: UpdateActivityBody = {};

        body.category = category;
        body.description = description;
        if (!amount) {
          body.amount = 0;
        } else {
          body.amount = amount;
        }
        body.transactionDate = transactionDate;

        return {
          url: `/dashboard/activity/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["MutateTransaction"],
    }),
    getAnalytics: builder.query<GetAnalyticsResponse, void>({
      query: () => ({
        url: "/dashboard/analytics",
      }),
      providesTags: ["MutateTransaction"],
    }),
    getOverview: builder.query<GetOverviewResponse, GetOverviewRequest>({
      query: (params) => ({
        url: "/dashboard/overview",
        params,
      }),
      providesTags: ["MutateTransaction"],
    }),
    scanDocuments: builder.mutation<
      AITransactionsResponse,
      AITransactionsRequest
    >({
      query: ({ files }) => {
        const formData = new FormData();

        files.forEach((file) => {
          formData.append("files", file);
        });

        return {
          url: "/dashboard/scan",
          method: "POST",
          body: formData,
          headers: {
            ["Content-Type"]: "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["MutateTransaction"],
    }),
    getSettings: builder.query<GetSettingsResponse, void>({
      query: () => ({
        url: "/dashboard/settings",
        method: "GET",
      }),
    }),

    patchUserEmail: builder.mutation<
      PatchUserEmailResponse,
      PatchUserEmailRequest
    >({
      query: (body) => ({
        url: "/dashboard/settings/email",
        method: "PATCH",
        body,
      }),
    }),

    patchUserPassword: builder.mutation<
      PatchUserPasswordResponse,
      PatchUserPasswordRequest
    >({
      query: (body) => ({
        url: "/dashboard/settings/password",
        method: "PATCH",
        body,
      }),
    }),
    getAllBudgets: builder.query<GetAllBudgetsResponse, void>({
      query: () => ({
        url: "/dashboard/budget",
      }),
    }),
    getBudgetById: builder.query<GetBudgetByIdResponse, BudgetByIdRequest>({
      query: ({ id }) => ({
        url: `/dashboard/budget/${id}`,
      }),
    }),
    activateBudget: builder.mutation<ActivateBudgetResponse, BudgetByIdRequest>(
      {
        query: ({ id }) => ({
          url: `/dashboard/budget/${id}/activate`,
          method: "POST",
        }),
      },
    ),
    deleteBudgetById: builder.mutation<
      DeleteBudgetByIdResponse,
      BudgetByIdRequest
    >({
      query: ({ id }) => ({
        url: `/dashboard/budget/${id}`,
        method: "DELETE",
      }),
    }),
    createBudget: builder.mutation<CreateBudgetResponse, CreateBudgetRequest>({
      query: (body) => ({
        url: "/dashboard/budget",
        method: "POST",
        body,
      }),
    }),
    updateBudget: builder.mutation<UpdateBudgetResponse, UpdateBudgetRequest>({
      query: ({ id, budget }) => ({
        url: `/dashboard/budget/${id}`,
        method: "PATCH",
        body: { budget },
      }),
    }),
  }),
});

export const {
  useGetActivityQuery,
  useDeleteTransactiopnMutation,
  useUpdateTransactionMutation,
  useGetAnalyticsQuery,
  useGetOverviewQuery,
  useScanDocumentsMutation,
  useGetSettingsQuery,
  usePatchUserEmailMutation,
  usePatchUserPasswordMutation,
} = dashboard;
