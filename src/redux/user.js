import { createSlice } from "@reduxjs/toolkit";
import { login, fetchAllUsers, registerUser, signout } from "../api";

const userModel = {
  token: "",
  address: "",
  photoUrl: "",
  displayName: "",
  uid: "",
  phone: "",
  email: "",
  accountStatus: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: {
    role: "user",
    isSuccess: true,
    isAuthenticated: false,
    error: "",
    loading: false,
    userModel,
    userList: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userModel = action.payload;
        state.role = "admin";
        state.isAuthenticated = true;
        localStorage.clear();
        localStorage.setItem("user-token", action.payload.uid);
        setSuccessParams(state);
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.userList = action.payload;
        setSuccessParams(state);
      })
      .addMatcher(
        (action) =>
          action.type.includes("signout/fulfilled") ||
          action.type.includes("registerUser/fulfilled"),
        (state) => {
          setSuccessParams(state);
          state.userModel = [];
          state.userList = [];
          state.role = "";
          state.isAuthenticated = false;
          localStorage.clear();
        }
      )
      .addMatcher(
        (action) => action.type.includes("login/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            login.rejected,
            signout.rejected,
            registerUser.rejected,
            fetchAllUsers.rejected,
          ].includes(action.type),
        (state) => {
          setFailureParams(action, state.error.message);
        }
      );
  },
});

const setSuccessParams = (state) => {
  state.success = true;
  state.loading = false;
  state.error = false;
};

const setFailureParams = (state, error) => {
  state.success = false;
  state.loading = false;
  state.error = error;
};

export default userSlice.reducer;
