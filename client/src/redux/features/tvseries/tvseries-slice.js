import { createSlice } from "@reduxjs/toolkit";
/**
 * @typedef {Object} CurrentStateObject
 * @typedef {Object} ActionWithPayload
 */

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
    /**
     * Reducer to populate tvseries state with logged in user's tvseries.
     * @param {CurrentStateObject} state - Current auth state ([])
     * @param {ActionWithPayload} action - Contains payload with data (tvseries coming from db).
     *
     * @returns {void}
     */
    setTvseries: (state, action) => {
      state.tvseries = action.payload;
    },

    /**
     * Reducer to set tvseries slice back to empty array.
     *
     * (This reducer is dispatched when user deletes the account or logs out)
     *
     * @param {CurrentStateObject} state - Current auth state (array of tvseries objects)
     *
     * @returns {void}
     */
    resetTvseries: (state) => {
      state.tvseries = [];
    },
  },
});

export const { setTvseries, resetTvseries } = tvseriesSlice.actions;
export default tvseriesSlice.reducer;
