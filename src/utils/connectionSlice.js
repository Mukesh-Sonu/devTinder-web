import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: () => {
      return null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
