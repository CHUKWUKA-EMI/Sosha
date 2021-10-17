import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: null,
    connectedFriends: null,
    selectedUser: null,
  },
  reducers: {
    setChats: (state, { payload }) => {
      state.chats = payload;
    },
    addChat: (state, { payload }) => {
      state.chats.push(payload);
      state.connectedFriends.map((fr) => {
        if (fr.userId === payload.userId) {
          fr.lastMessage = payload.message;
        }
      });
    },
    setConnectedFriends: (state, { payload }) => {
      state.connectedFriends = payload;
    },
    selectUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChats, setConnectedFriends, selectUser, addChat } =
  chatSlice.actions;

export default chatSlice.reducer;
