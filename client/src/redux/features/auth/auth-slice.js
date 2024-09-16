import { createSlice } from "@reduxjs/toolkit";
/**
 * @typedef {Object} CurrentStateObject
 * @typedef {Object} ActionWithPayload
 */

/**
 * @constant
 * Initial state of auth slice
 *
 * @type {{ user: string|null; tokenExpDate: string|null; }}
 */
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  tokenExpDate: JSON.parse(localStorage.getItem("exp")) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Reducer to set logged in user and token exp date.
     *
     * (Set state to local storage)
     *
     * @param {CurrentStateObject} state - Current auth state (null)
     * @param {ActionWithPayload} action - Contains payload with data to update auth state (allow user to be logged in).
     *
     * @returns {void}
     */
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.tokenExpDate = action.payload.tokenExpDate;
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("exp", JSON.stringify(state.tokenExpDate));
    },

    /**
     * Reducer to reset user name (no tokenExp).
     *
     * (Set state to local storage)
     *
     * @param {CurrentStateObject} state - Current auth state (logged in user)
     * @param {ActionWithPayload} action - Contains payload with new user name (in case user updates the name).
     *
     * @returns {void}
     */
    setOnlyCredentialsUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    /**
     * Reducer to clear state and set it back to null.
     *
     * (Clear local storage)
     *
     * @param {CurrentStateObject} state - Current auth state (logged in user)
     *
     * @returns {void}
     */
    clearCredentials: (state) => {
      state.user = null;
      state.tokenExpDate = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, setOnlyCredentialsUser, clearCredentials } =
  authSlice.actions;
export default authSlice.reducer;
