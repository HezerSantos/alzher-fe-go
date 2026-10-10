import { api } from "./apiService";

interface LoginResponse {
  userId: string;
  email: string;
  token: string;
  expiresAt: number;
  issuedAt: number;
  callResults: unknown;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface CreateUserRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

interface CreateUserResponse {
  message: string;
  user: string;
  callResults: unknown;
}

export const auth = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (args) => ({
        url: `/auth/login`,
        method: "POST",
        body: {
          email: args.email,
          password: args.password,
        },
      }),
    }),
    signUp: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: ({ email, password, confirmPassword }) => ({
        url: `/auth/signup`,
        method: "POST",
        body: {
          email,
          password,
          confirmPassword,
        },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    refresh: builder.mutation<LoginResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useRefreshMutation,
} = auth;
