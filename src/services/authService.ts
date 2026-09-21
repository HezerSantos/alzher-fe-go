import { api } from "./apiService";

interface LoginResponse {
  userId: string;
  email: string;
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
        url: `/login`,
        method: "POST",
        body: {
          email: args.email,
          password: args.password,
        },
      }),
    }),
    signUp: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: ({ email, password, confirmPassword }) => ({
        url: `/signup`,
        method: "POST",
        body: {
          email,
          password,
          confirmPassword,
        },
      }),
    }),
  }),
});
