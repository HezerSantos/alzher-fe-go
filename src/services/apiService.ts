import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import config from "../../config.json";
import { logout } from "../reducers/authSlice";
import type { RootState } from "../reducers/store";
import { setNotFound } from "../reducers/errorSlice";

interface Boot {
  baseUrl: string;
  throttleRequests: boolean;
  throttleTime: number;
}
const typedConfig = config as Boot;

const baseQuery = fetchBaseQuery({
  baseUrl: typedConfig.baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryHandler: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (config.throttleRequests) {
    await new Promise((resolve) =>
      setTimeout(resolve, config.throttleTime || 0),
    );
  }
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logout());
  }
  if (result.error?.status === 404) {
    api.dispatch(setNotFound());
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryHandler,
  endpoints: () => ({}),
  tagTypes: ["UpdateTransaction"],
});
