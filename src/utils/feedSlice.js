import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: () => {
      return null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
