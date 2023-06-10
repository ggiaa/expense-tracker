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
import moment from "moment";
import { date } from "yup";

const initialState = {
  transactions: [],
  recentTransaction: [],
  currentWeekTransaction: [],
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
    const q = await query(
      collection(db, "transactions"),
      orderBy("date", "desc")
    );

    const fetchResult = await getDocs(q);
    const filteredData = fetchResult.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return filteredData;
  }
);

export const fetchMasterTransaction = createAsyncThunk(
  "transaction/fetchMasterTransaction",
  async () => {
    const firstDateOfCurrentWeek = moment().startOf("week").date() - 1;
    const lastDateOfCurrentWeek = moment().endOf("week").date() + 1;

    const q = query(
      collection(db, "master_transactions"),
      where("date.day", "<", lastDateOfCurrentWeek),
      where("date.day", ">", firstDateOfCurrentWeek),
      orderBy("date.day")
    );

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

      const firstDateOfCurrentWeek = moment().startOf("week");
      const lastDateOfCurrentWeek = moment().endOf("week");
      state.currentWeekTransaction = action.payload.filter(
        (data) =>
          new Date(data.date.seconds * 1000) >= firstDateOfCurrentWeek &&
          new Date(data.date.seconds * 1000) <= lastDateOfCurrentWeek
      );
      state.isLoading = false;
    });
    builder.addCase(fetchTransactions.pending, (state, action) => {
      state.transactions = [];
      state.recentTransaction = [];
      state.currentWeekTransaction = [];
      state.isLoading = true;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.transactions = [];
      state.recentTransaction = [];
      state.currentWeekTransaction = [];
      state.isLoading = false;
    });

    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.recentTransaction = action.payload.slice(0, 5);
      const firstDateOfCurrentWeek = moment().startOf("week");
      const lastDateOfCurrentWeek = moment().endOf("week");
      state.currentWeekTransaction = action.payload.filter(
        (data) =>
          new Date(data.date.seconds * 1000) >= firstDateOfCurrentWeek &&
          new Date(data.date.seconds * 1000) <= lastDateOfCurrentWeek
      );
      state.isLoading = false;
    });
    builder.addCase(addTransaction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addTransaction.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(fetchMasterTransaction.fulfilled, (state, action) => {
      state.currentWeekTransaction = action.payload;
      // state.transactions = action.payload;
      // state.recentTransaction = action.payload.slice(0, 5);
      // const firstDateOfCurrentWeek = moment().startOf("week");
      // const lastDateOfCurrentWeek = moment().endOf("week");
      // state.currentWeekTransaction = action.payload.filter(
      //   (data) =>
      //     new Date(data.date.seconds * 1000) >= firstDateOfCurrentWeek &&
      //     new Date(data.date.seconds * 1000) <= lastDateOfCurrentWeek
      // );
      // state.isLoading = false;
    });
    builder.addCase(fetchMasterTransaction.pending, (state, action) => {
      // state.transactions = [];
      // state.recentTransaction = [];
      // state.currentWeekTransaction = [];
      state.isLoading = true;
    });
    builder.addCase(fetchMasterTransaction.rejected, (state, action) => {
      // state.transactions = [];
      // state.recentTransaction = [];
      // state.currentWeekTransaction = [];
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
