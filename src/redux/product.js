import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../api";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: false,
    filteredData: [],
  },
  reducers: {
    filterProducts: (state, action) => {
      if (action.payload !== "ALL") {
        const data = state.products.filter(
          (product) => product.category === action.payload
        );
        state.filteredData = data;
      } else {
        state.filteredData = [];
      }
    },
    saveProduct: (state, action) => {
      state.products.push(action.payload);
      //Update stock model data
      //Increment qty
    },
    updateProduct: (state, action) => {
      const p = state.products.find(
        (product) => product.id === action.payload.id
      );
      p.title = action.payload.title;
      p.description = action.payload.description;
      p.price = action.payload.price;
    },
    deleteProduct: (state, action) => {},
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filterProducts = [];
    },
    [fetchProducts.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { filterProducts, saveProduct, updateProduct, deleteProduct } =
  productSlice.actions;
export default productSlice.reducer;
