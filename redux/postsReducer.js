import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
    selectedPost: null,
  },
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts.unshift(payload);
    },
    deletePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
    addAComment: (state, { payload }) => {
      const post = state.posts.find((post) => post.id === payload.TweetId);
      if (post) {
        post.Comments.push(payload);
      }
    },
    likePost: (state, { payload }) => {
      const post = state.posts.find((post) => post.id === payload.TweetId);
      if (post) {
        post.Likes.push(payload);
      }
    },
    unlikePost: (state, { payload }) => {
      const post = state.posts.find((post) => post.id === payload.TweetId);
      if (post) {
        post.Likes = post.Likes.filter((like) => like.id !== payload.likeId);
      }
    },
    setSelectedPost: (state, { payload }) => {
      state.selectedPost = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPosts,
  addPost,
  deletePost,
  addAComment,
  setSelectedPost,
  likePost,
  unlikePost,
} = postSlice.actions;

export default postSlice.reducer;
