import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";

const initialState = {
  categories: [],
  isLoading: true,
};

export const fetchCategories = createAsyncThunk(
  "accounts/fetchCategories",
  async () => {
    const data = await getDocs(collection(db, "categories"));
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredData;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.categories = [];
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories = [];
      state.isLoading = false;
    });
  },
});

export default categoriesSlice.reducer;
