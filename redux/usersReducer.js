import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
  },
  reducers: {
    getUsers: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.users = payload;
    },

    connectwithFriend: (state, { payload }) => {
      console.log("connectwithFriend", payload);
      // state.users = state.users.filter((user) => user.id !== payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUsers, connectwithFriend } = usersSlice.actions;

export default usersSlice.reducer;
