import { api } from "./apiService";

interface TransactionItem {
  transactionId: string;
  category: string;
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

interface UpdateActivityBody {
  category?:
    | "Dining"
    | "Merchandise"
    | "Entertainment"
    | "Grocery"
    | "Transportation"
    | "Subscriptions"
    | "Bills";
  description?: string;
  amount?: number;
  transactionDate?: string;
}

type UpdateActivityReqest = METHODActivityURI & UpdateActivityBody;

interface UpdateActivityResponse {
  transaction: Transaction;
  updatedTransaction?: Transaction;
  updatedMap: Record<string, any>;
}
const dashboard = api.injectEndpoints({
  endpoints: (builder) => ({
    getActivity: builder.query<GetActivityResponse, GetActivityRequestParams>({
      query: (params) => ({
        url: "/dashboard/activity",
        params,
      }),
    }),
    deleteTransactiopn: builder.mutation<
      DeleteActivityResponse,
      METHODActivityURI
    >({
      query: ({ id }) => ({
        url: `/dashboard/activity/${id}`,
        method: "DELTE",
      }),
    }),
    updateTransaction: builder.mutation<
      UpdateActivityResponse,
      UpdateActivityReqest
    >({
      query: ({ id, category, description, amount, transactionDate }) => {
        const body: UpdateActivityBody = {};

        if (category !== undefined) body.category = category;
        if (description !== undefined) body.description = description;
        if (amount !== undefined) body.amount = amount;
        if (transactionDate !== undefined)
          body.transactionDate = transactionDate;

        return {
          url: `/dashboard/activity/${id}`,
          method: "PATCH",
          body: body,
        };
      },
    }),
  }),
});

export const { useGetActivityQuery } = dashboard;
