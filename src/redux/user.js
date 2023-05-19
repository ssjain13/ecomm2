import { createSlice } from "@reduxjs/toolkit";
import { login, fetchAllUsers, registerUser, signout } from "../api";
import {
  deleteAccount,
  disableAccount,
  enableAccount,
} from "../api/user.actions";

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
      .addCase(deleteAccount.fulfilled, (state, action) => {
        setSuccessParams(state);
        state.userList = state.userList.filter(
          (user) => user.uid !== action.payload.uid
        );
      })
      .addCase(disableAccount.fulfilled, (state, action) => {
        setSuccessParams(state);
        state.userList = state.userList.map((user) => {
          if (user.uid === action.payload.uid) {
            return { ...user, disabled: true };
          } else return user;
        });
      })
      .addCase(enableAccount.fulfilled, (state, action) => {
        setSuccessParams(state);
        state.userList = state.userList.map((user) => {
          if (user.uid === action.payload.uid) {
            return { ...user, disabled: false };
          } else return user;
        });
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
            disableAccount.rejected,
            enableAccount.rejected,
            deleteAccount.rejected,
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
