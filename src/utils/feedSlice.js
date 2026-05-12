import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  page: 1,
  hasMore: true,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action) => {
      (state.users = action.payload.data),
        (state.page = action.payload.page),
        (state.hasMore = action.payload.hasMore);
    },
    appendFeed: (state, action) => {
      state.users.push(...action.payload.data);
      state.page = action.payload.page;
      state.hasMore = action.payload.hasMore;
    },
    removeUserFromFeed: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFeed, removeUserFromFeed, appendFeed } = feedSlice.actions;

export default feedSlice.reducer;
