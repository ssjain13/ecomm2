import { createSlice } from "@reduxjs/toolkit";
import { deleteCategory, fetchCategories, saveCategory, updateCategory } from "../api";

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
[deleteCategory.fulfilled]:(state, action)=>{
  state.loading = false;
  state.categories = state.categories.filter((i) => i.id !== action.payload.id);
}

   
  },
});

export default categorySlice.reducer;
