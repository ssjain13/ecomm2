import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./product";
import cartReducer from "./cart";
import categoryReducer from "./category";
import BillingReducer from "./billing";
import userReducer from "./user";

export default configureStore({
  reducer: {
    categories: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    billing: BillingReducer,
    user: userReducer,
  },
});
