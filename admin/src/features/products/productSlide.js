import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "Waiting",
};
export const statusSlide = createSlice({
  name: "statusProduct",
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      const { status } = action.payload;
      state.status = status;
    },
    resetStatus: (state) => {
      state.status = "Waiting";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStatus, resetStatus } = statusSlide.actions;

export default statusSlide.reducer;
