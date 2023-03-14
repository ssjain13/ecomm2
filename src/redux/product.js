import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  saveProduct,
  deleteProduct,
  fetchProductsCount,
  updateProduct,
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
  reducers: {
    filterProducts: (state, action) => {
      if (action.payload !== "ALL") {
        const data = state.products.filter(
          (product) => product.category === action.payload
        );
        if (data.length > 0) {
          state.filteredData = data;
        } else {
          state.filteredData = [];
        }
      } else {
        state.filteredData = state.products;
      }
    },

    deleteProductById: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.products = state.products.filter((i) => i.id !== action.payload);
    },
    updateProductAction: (state, action) => {
      const p = state.products.find(
        (product) => product.id === action.payload.id
      );
      p.title = action.payload.title;
      p.description = action.payload.description;
      p.price = action.payload.price;
      p.category = action.payload.category;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filteredData = action.payload;
    },
    [fetchProducts.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [saveProduct.pending]: (state) => {
      state.loading = true;
    },
    [saveProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    },
    [saveProduct.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = state.products.filter((i) => i.id !== action.payload.id);
    },
    [deleteProduct.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [fetchProductsCount.fulfilled]: (state, action) => {
      state.productCategoryMap.push(action.payload);
    },

   
  },
});

export const { filterProducts, deleteProductById } = productSlice.actions;
export default productSlice.reducer;
