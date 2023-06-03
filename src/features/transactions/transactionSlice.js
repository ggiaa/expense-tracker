import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";

const initialState = {
  transactions: [],
  recentTransaction: [],
  isLoading: true,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTrasactions",
  async () => {
    const fetchResult = await getDocs(
      collection(db, "transactions"),
      orderBy("created_at"),
      limit(20)
    );

    const filteredData = fetchResult.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return filteredData;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      console.log(action.payload);
      state.transactions = action.payload;
      state.recentTransaction = action.payload.slice(0, 5);
      state.isLoading = false;
    });
    builder.addCase(fetchTransactions.pending, (state, action) => {
      state.transactions = [];
      state.recentTransaction = [];
      state.isLoading = true;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.transactions = [];
      state.recentTransaction = [];
      state.isLoading = false;
    });
  },
});

export default transactionsSlice.reducer;
