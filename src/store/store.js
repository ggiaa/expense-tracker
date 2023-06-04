import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../features/accounts/accountsSlice";
import transactionsReducer from "../features/transactions/transactionSlice";
import categoriesReducer from "../features/categories/categoriesSlice";

const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
