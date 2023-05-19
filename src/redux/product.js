import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  saveProduct,
  deleteProduct,
  fetchProductsCount,
} from "../api";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: false,
    filteredData: [],
    productCategoryMap: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(saveProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.filteredData.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.products = state.products.filter(
          (i) => i.id !== action.payload.id
        );
      })
      .addCase(fetchProductsCount.fulfilled, (state, action) => {
        state.loading = false;
        state.productCategoryMap = action.payload;
      })
      .addMatcher(
        (action) =>
          [
            fetchProducts.pending,
            saveProduct.pending,
            deleteProduct.pending,
            fetchProductsCount.pending,
          ].includes(action.type.endsWith("/pending")),
        (state) => {
          console.log("In pending state")
          state.loading = true;
          state.productCategoryMap = [];
        }
      )
      .addMatcher(
        (action) =>
          [
            fetchProducts.rejected,
            saveProduct.rejected,
            deleteProduct.rejected,
            fetchProductsCount.rejected,
          ].includes(action.type.endsWith("/rejected")),
        (state) => {
          state.loading = false;
          state.error = true;
          state.productCategoryMap = [];
        }
      );
  },
});

export default productSlice.reducer;
