import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, saveCategory } from "../api";

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
    [saveCategory.pending]: (state) => {
      state.loading = true;
    },
    [saveCategory.fulfilled]: (state, action) => {
      state.categories.push(action.payload);
      state.loading = false;
    },
    [saveCategory.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default categorySlice.reducer;
