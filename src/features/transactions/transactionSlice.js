import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import RecentTransactions from "../../components/homePageComponents/RecentTransactions";
import { db } from "../../config/firebase";
import moment from "moment";
import { date } from "yup";

const initialState = {
  transactions: [],
  recentTransactions: [],
  monthlyMasterTransactions: [],
  currentWeekMasterTransactions: [],
  isLoading: true,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTrasactions",
  async () => {
    // Get all Transactions
    const transactionQuery = query(
      collection(db, "transactions"),
      orderBy("date", "desc")
    );
    const transactionsResponse = await getDocs(transactionQuery);
    const transactions = transactionsResponse.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Get monthly master transaction
    const monthlyMasterTransation = query(
      collection(db, "master_transactions"),
      where("created_at", ">=", new Date(moment().startOf("month"))),
      where("created_at", "<=", new Date(moment().endOf("month"))),
      orderBy("created_at")
    );

    const monthlyMasterTransactionResponse = await getDocs(
      monthlyMasterTransation
    );
    const monthlyMasterTransaction = monthlyMasterTransactionResponse.docs.map(
      (doc) => ({
        ...doc.data(),
        id: doc.id,
      })
    );

    // Get current week master transaction
    const currentWeekMasterTransations = query(
      collection(db, "master_transactions"),
      where("created_at", ">=", new Date(moment().startOf("week"))),
      where("created_at", "<=", new Date(moment().endOf("week"))),
      orderBy("created_at")
    );

    const currentWeekMasterTransactionsResponse = await getDocs(
      currentWeekMasterTransations
    );
    const currentWeekMasterTransactions =
      currentWeekMasterTransactionsResponse.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

    return {
      transactions,
      monthlyMasterTransaction,
      currentWeekMasterTransactions,
    };
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (params) => {
    const docID = moment().format("DD MMMM YYYY");
    const created_at = params.created_at;
    const income = params.is_income ? params.amount : 0;
    const expense = params.is_expense ? params.amount : 0;

    const response = await addDoc(collection(db, "transactions"), params);
    // .then(
    //   (docRef) => {
    //     const masterTransactionRef = doc(db, "master_transactions", docID);
    //     setDoc(
    //       masterTransactionRef,
    //       {
    //         created_at,
    //         detail_transaction: arrayUnion(docRef),
    //         income: increment(income),
    //         expense: increment(expense),
    //       },
    //       { merge: true }
    //     );

    //     return docRef;
    //   }
    // );

    try {
      console.log(response.docs);
      // response.docs.map((doc) => console.log("aaa" + doc));
    } catch (error) {
      console.log(error);
    }

    // console.log(filteredData);
    // const filteredData = response.docs.map((doc) => ({
    //   ...doc.data(),
    //   id: doc.id,
    // }));
    // console.log(response);
    // const q = await query(
    //   collection(db, "transactions"),
    //   orderBy("date", "desc")
    // );

    // const fetchResult = await getDocs(q);
    // const filteredData = fetchResult.docs.map((doc) => ({
    //   ...doc.data(),
    //   id: doc.id,
    // }));

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
      state.transactions = action.payload.transactions;
      state.recentTransactions = action.payload.transactions.slice(0, 5);
      state.monthlyMasterTransactions = action.payload.monthlyMasterTransaction;
      state.currentWeekMasterTransactions =
        action.payload.currentWeekMasterTransactions;
      state.isLoading = false;

      // console.log(action.payload);

      // const firstDateOfCurrentWeek = moment().startOf("week");
      // const lastDateOfCurrentWeek = moment().endOf("week");
      // state.currentWeekTransaction = action.payload.filter(
      //   (data) =>
      //     new Date(data.date.seconds * 1000) >= firstDateOfCurrentWeek &&
      //     new Date(data.date.seconds * 1000) <= lastDateOfCurrentWeek
      // );
    });
    builder.addCase(fetchTransactions.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
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

    // builder.addCase(fetchMasterTransaction.fulfilled, (state, action) => {
    //   state.transactions = action.payload;
    //   state.recentTransaction = action.payload.slice(0, 5);

    //   const firstDateOfCurrentWeek = moment().startOf("week");
    //   const lastDateOfCurrentWeek = moment().endOf("week");
    //   state.currentWeekTransaction = action.payload.filter(
    //     (data) =>
    //       new Date(data.date.seconds * 1000) >= firstDateOfCurrentWeek &&
    //       new Date(data.date.seconds * 1000) <= lastDateOfCurrentWeek
    //   );
    //   state.isLoading = false;
    //   // state.currentWeekTransaction = action.payload;
    //   // state.transactions = action.payload;
    //   // state.recentTransaction = action.payload.slice(0, 5);
    //   // const firstDateOfCurrentWeek = moment().startOf("week");
    //   // const lastDateOfCurrentWeek = moment().endOf("week");
    //   // state.currentWeekTransaction = action.payload.filter(
    //   //   (data) =>
    //   //     new Date(data.date.seconds * 1000) >= firstDateOfCurrentWeek &&
    //   //     new Date(data.date.seconds * 1000) <= lastDateOfCurrentWeek
    //   // );
    //   // state.isLoading = false;
    // });
    // builder.addCase(fetchMasterTransaction.pending, (state, action) => {
    //   state.transactions = [];
    //   state.recentTransaction = [];
    //   state.currentWeekTransaction = [];
    //   state.isLoading = true;
    // });
    // builder.addCase(fetchMasterTransaction.rejected, (state, action) => {
    //   state.transactions = [];
    //   state.recentTransaction = [];
    //   state.currentWeekTransaction = [];
    //   state.isLoading = false;
    // });

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
