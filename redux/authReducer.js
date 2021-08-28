import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authData",
  initialState: {
    authData: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.authData = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login } = authSlice.actions;

export default authSlice.reducer;
