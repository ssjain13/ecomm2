import { createSlice } from "@reduxjs/toolkit";
import { authenticate, registerUser } from "../api";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    displayName: "",
    username: "",
    password: "",
    role: "user",
    isSuccess: false,
    token: "",
    error: "",
    loading: true,
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
      state.loading = false;
    },
    [authenticate.rejected]: (state, action) => {
      state.isSuccess = false;
      state.loading = false;
      state.error = action.error.message;
    },
    [authenticate.pending]: (state, action) => {
      state.loading = true;
      state.isSuccess = false;
      state.error = "";
    },
    [registerUser.pending]: (state, action) => {
      state.loading = true;
      state.isSuccess = false;
      state.error = "";
    },
    [registerUser.rejected]: (state, action) => {
      state.isSuccess = false;
      state.loading = false;
      state.error = action.error.message;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.isSuccess = true;
      //state.role = "admin";
      state.error = "";
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.loading = false;
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
