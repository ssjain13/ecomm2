import { createSlice } from "@reduxjs/toolkit";
import { authenticate } from "../api";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email:"",
    displayName:"",
    username: "",
    password: "",
    role: "user",
    isSuccess: false,
    token: "",
    error: "",
  },
  reducers: {
    logoutUser: (state, action) => {
      (state.password = ""),
        (state.username = ""),
        (state.role = ""),
        (state.isSuccess = "false");
    },
  },
  extraReducers: {
    [authenticate.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.isSuccess = true;
      state.role = "admin";
      state.error = "";
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
    },
    [authenticate.rejected]: (state, action) => {
      state.isSuccess = false;
      state.error = action.error.message;
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
