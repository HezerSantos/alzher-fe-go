import { configureStore } from "@reduxjs/toolkit";
import bootReducer from "./bootSlice";
import authReducer from "./authSlice";
import { api } from "../services/apiService";

const store = configureStore({
  reducer: {
    boot: bootReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
