import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "Light",
  user: { firstName: "Nourhan", lastName: "Ahmed" },
  token: null,
  posts: [],
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = state.theme === "Light" ? "Dark" : "Light";
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends don't-exist!");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    updatePost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});
export const { toggleTheme, login, logout, setFriends, setPosts, updatePost } =
  authSlice.actions;

export default authSlice.reducer;
