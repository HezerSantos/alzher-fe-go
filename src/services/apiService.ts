import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import config from "../../config.json";
import { logout } from "../reducers/authSlice";

interface Boot {
  baseUrl: string;
}
const typedConfig = config as Boot;

const baseQuery = fetchBaseQuery({
  baseUrl: typedConfig.baseUrl,
});

const baseQueryHandler: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryHandler,
  endpoints: () => ({}),
});
