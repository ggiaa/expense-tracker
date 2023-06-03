import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../features/accounts/accountsSlice";
import transactionsReducer from "../features/transactions/transactionSlice";

const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
