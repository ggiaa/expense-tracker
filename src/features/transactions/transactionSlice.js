import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import RecentTransactions from "../../components/homePageComponents/RecentTransactions";
import { db } from "../../config/firebase";

const initialState = {
  transactions: [],
  recentTransaction: [],
  isLoading: true,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTrasactions",
  async () => {
    const q = query(collection(db, "transactions"), orderBy("date", "desc"));

    const fetchResult = await getDocs(q);
    const filteredData = fetchResult.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return filteredData;
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (params) => {
    const response = await addDoc(collection(db, "transactions"), params);
    const q = query(collection(db, "transactions"), orderBy("date", "desc"));

    const fetchResult = await getDocs(q);
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

    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.recentTransaction = action.payload.slice(0, 5);
      state.isLoading = false;
    });
    builder.addCase(addTransaction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addTransaction.rejected, (state, action) => {
      state.isLoading = false;
    });

    // builder.addCase(addTransaction.fulfilled, (state, action) => {
    //   const newRecord = action.payload.data;
    //   newRecord.id = action.payload.id;

    //   state.transactions = [...state.transactions, newRecord];

    //   if (state.recentTransaction.length > 4) {
    //     state.recentTransaction.pop();
    //   }

    //   state.recentTransaction = [newRecord, ...state.recentTransaction];
    //   state.isLoading = false;
    // });
    // builder.addCase(addTransaction.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(addTransaction.rejected, (state, action) => {
    //   state.isLoading = false;
    // });
  },
});

export default transactionsSlice.reducer;
