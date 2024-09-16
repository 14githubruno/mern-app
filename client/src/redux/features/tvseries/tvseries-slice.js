import { createSlice } from "@reduxjs/toolkit";

/**
 * @constant
 * Initial state of tvseries slice
 *
 * @type {{ tvseries: Array<object>|[]; }}
 */
const initialState = {
  tvseries: [],
};

export const tvseriesSlice = createSlice({
  name: "tvseries",
  initialState,
  reducers: {
    setTvseries: (state, action) => {
      state.tvseries = action.payload;
    },
    resetTvseries: (state, action) => {
      state.tvseries = [];
    },
  },
});

export const { setTvseries, resetTvseries } = tvseriesSlice.actions;
export default tvseriesSlice.reducer;
