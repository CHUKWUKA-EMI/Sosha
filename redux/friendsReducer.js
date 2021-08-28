import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: null,
  },
  reducers: {
    getFriends: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.friends = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
