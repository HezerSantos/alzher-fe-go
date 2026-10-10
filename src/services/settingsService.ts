import { api } from "./apiService";

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

export const settings = api.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<GetSettingsResponse, void>({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
    }),

    patchUserEmail: builder.mutation<
      PatchUserEmailResponse,
      PatchUserEmailRequest
    >({
      query: (body) => ({
        url: "/settings/email",
        method: "PATCH",
        body,
      }),
    }),

    patchUserPassword: builder.mutation<
      PatchUserPasswordResponse,
      PatchUserPasswordRequest
    >({
      query: (body) => ({
        url: "/settings/password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetSettingsQuery,
  usePatchUserEmailMutation,
  usePatchUserPasswordMutation,
} = settings;
