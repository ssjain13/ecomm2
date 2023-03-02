import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      const item = state.cartItems.find((item) => item.id === payload.id);
      if (item) {
        item.qty++;
      } else {
        state.cartItems.push({ ...payload, qty: 1 });
      }
    },
    increment: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      item.qty++;
    },
    decrement: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      item.qty--;
      if (item.qty === 0) {
        state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
      }
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increment, decrement } =
  cartSlice.actions;

export default cartSlice.reducer;
