import { createSlice } from "@reduxjs/toolkit";
import { authenticate, fetchAllUsers, registerUser, signout } from "../api";

const userModel = {
  token: "",
  address: "",
  photoUrl: "",
  displayName: "",
  uid: "",
  phone: "",
  email: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    password: "",
    role: "user",
    isSuccess: true,
    isAuthenticated: false,
    error: "",
    loading: false,
    userModel,
    userList: [],
  },
  extraReducers: {
    [authenticate.fulfilled]: (state, action) => {
      state.userModel = action.payload;
      state.isSuccess = true;
      state.role = "admin";
      state.error = "";
      state.loading = false;
      state.isAuthenticated = true;
      localStorage.clear();
      localStorage.setItem("user-token", action.payload.uid);
    },
    [authenticate.rejected]: (state, action) => {
      state.isSuccess = false;
      state.loading = false;
      state.error = action.error.message;
      state.isAuthenticated = false;
    },
    [authenticate.pending]: (state, action) => {
      state.loading = true;
      state.isSuccess = false;
      state.error = "";
      state.isAuthenticated = false;
    },
    [signout.fulfilled]: (state, action) => {
      state.userModel = [];
      state.userList = [];
      state.isSuccess = true;
      state.role = "";
      state.error = "";
      state.loading = false;
      state.isAuthenticated = false;
      localStorage.clear();
    },
    [signout.rejected]: (state, action) => {
      state.isSuccess = false;
      state.loading = false;
      state.error = action.error.message;
    },
    [signout.pending]: (state, action) => {
      state.loading = true;
      state.isSuccess = false;
      state.error = "";
      state.isAuthenticated = false;
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
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.userList = action.payload;
      state.loading = false;
      state.error = false;
    },

    [fetchAllUsers.pending]: (state, action) => {
      state.userList = [];
      state.loading = true;
      state.error = false;
    },

    [fetchAllUsers.rejected]: (state, action) => {
      state.isSuccess = false;
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;
