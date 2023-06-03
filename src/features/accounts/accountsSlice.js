import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";

const initialState = {
  accounts: [],
  isLoading: true,
};

// FETCH ACCOUNT
export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    const data = await getDocs(
      collection(db, "accounts"),
      orderBy("pinned_order")
    );
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredData;
  }
);

// UPDATE PINNED ACCOUNT
export const UpdatePinnedAccount = createAsyncThunk(
  "accounts/UpdatePinnedAccount",
  async (params) => {
    try {
      const pinnedAccounts = params.pinnedAccounts;
      const temporaryPinnedAccount = params.temporaryPinnedAccount;

      pinnedAccounts.map(async (item) => {
        const accountsCollect = doc(db, "accounts", item.id);
        await updateDoc(accountsCollect, { pinned: false, pinned_order: 99 });
      });

      temporaryPinnedAccount.map(async (item, index) => {
        const accountsCollect = doc(db, "accounts", item.id);
        await updateDoc(accountsCollect, {
          pinned: true,
          pinned_order: index + 1,
        });
      });

      return params;
    } catch (error) {
      console.log(error);
    }
  }
);

// ADD NEW ACCOUNT
export const AddNewAccount = createAsyncThunk(
  "accounts/AddNewAccount",
  async (params) => {
    try {
      const result = await addDoc(collection(db, "accounts"), params);
      return { data: params, id: result.id };
    } catch (error) {
      console.log(error);
    }
  }
);

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH ACCOUNT
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAccounts.pending, (state, action) => {
      state.isLoading = true;
      state.accounts = [];
    });
    builder.addCase(fetchAccounts.rejected, (state, action) => {
      state.isLoading = false;
      state.accounts = [];
    });

    // UPDATE PINNED ACCOUNT
    builder.addCase(UpdatePinnedAccount.fulfilled, (state, action) => {
      const { pinnedAccounts, temporaryPinnedAccount } = action.payload;

      state.accounts.map((account) => {
        pinnedAccounts.map((item) => {
          if (account.id == item.id) {
            account.pinned = false;
            account.pinned_order = 99;
          }
        });
        temporaryPinnedAccount.map((item, index) => {
          if (account.id == item.id) {
            account.pinned = true;
            account.pinned_order = index + 1;
          }
        });
        return account;
      });

      state.isLoading = false;
    });
    builder.addCase(UpdatePinnedAccount.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(UpdatePinnedAccount.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ADD NEW ACCOUNT
    builder.addCase(AddNewAccount.fulfilled, (state, action) => {
      const newRecord = action.payload.data;
      newRecord.id = action.payload.id;

      state.accounts = [...state.accounts, newRecord];
      state.isLoading = false;
    });
    builder.addCase(AddNewAccount.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(AddNewAccount.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default accountsSlice.reducer;
