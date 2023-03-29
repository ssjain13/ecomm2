import { createSlice } from "@reduxjs/toolkit";
import { authenticate, fetchAllUsers, registerUser } from "../api";

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
    error: "",
    loading: false,
    userModel,
    userList:[]
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
      state.userModel = action.payload;
      state.isSuccess = true;
      state.role = "admin";
      state.error = "";
      state.loading = false;
      localStorage.clear();
      localStorage.setItem("user-token", action.payload.uid);
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
    [fetchAllUsers.fulfilled]:(state, action) => {
      state.userList = action.payload;
      state.loading = false;
      state.error = false;
    },

    [fetchAllUsers.pending]:(state, action) => {
      state.userList = [];
      state.loading = true;
      state.error = false;
    },

    [fetchAllUsers.rejected]:(state, action) => {
      state.isSuccess = false;
      state.loading = false;
      state.error = action.error.message;
    },

  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
