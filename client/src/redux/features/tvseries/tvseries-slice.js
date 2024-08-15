import { createSlice } from "@reduxjs/toolkit";

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
      console.log("clearing tvseries");
      state.tvseries = [];
    },
  },
});

export const { setTvseries, resetTvseries } = tvseriesSlice.actions;
export default tvseriesSlice.reducer;
