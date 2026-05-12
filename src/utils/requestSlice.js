import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      return state.filter(
        ({ fromUserId }) => fromUserId._id !== action.payload.fromUserId
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addRequests, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
