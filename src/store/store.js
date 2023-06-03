import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../features/accounts/accountsSlice";

const store = configureStore({
  reducer: {
    accounts: accountsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
