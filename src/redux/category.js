import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../api";

const categorySlice = createSlice({
  name: "categories",
  initialState: { categories: [], loading: false, error: false },
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.loading = true;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    [fetchCategories.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});


export default categorySlice.reducer