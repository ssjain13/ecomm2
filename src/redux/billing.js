import { createSlice } from "@reduxjs/toolkit";

const BillingSlice = createSlice({
  name: "billing",
  initialState: {
    billingInfo: {
      total: 0,
      items: [],
      address: "",
      invoiceNumber: "",
      discount: 10,
    },
  },
  reducers: {
    onSubmitAddress: (state, action) => {
      state.billingInfo.address = action.payload;
    },

    getOrderSummary: (state, action) => {
      state.billingInfo.items = action.payload;

      let sum = 0;
      state.billingInfo.items.map((item) => {
        let d = Math.round(item.price - (state.billingInfo.discount / 100) * item.price);
        sum = sum + item.price * item.qty;

        return {
          ...item,
          discountPrice: d,
        };
      });
      state.billingInfo.total = sum;
    },
  },
});

export const {
  updateTotal,
  getOrderSummary,
  onSubmitAddress,
  calculateDiscount,
} = BillingSlice.actions;

export default BillingSlice.reducer;
