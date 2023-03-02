import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { username: "", password: "", role: "user", isSuccess: false },
  reducers: {
    loginUser: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      if (state.username === "sonal" && state.password === "admin") {
        state.role = "admin";
        state.isSuccess = true;
      } else {
        state.role = "user";
        state.isSuccess = true;
      }
    },
    logoutUser: (state, action) => {
      state.password = "",
        state.username = "",
        state.role = "",
        state.isSuccess = "false";
    },
  },
});

export const { loginUser , logoutUser} = userSlice.actions;

export default userSlice.reducer;
