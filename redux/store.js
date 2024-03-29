import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersReducer";
import friendsReducer from "./friendsReducer";
import authReducer from "./authReducer";
import chatReducer from "./chatsReducer";
import postReducer from "./postsReducer";
import countriesReducer from "./countriesReducer";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    friends: friendsReducer,
    authData: authReducer,
    chats: chatReducer,
    posts: postReducer,
    countries: countriesReducer,
  },
});
