// redux lib
import { createSlice } from "@reduxjs/toolkit";

// lib
import { setAuthInitialState } from "../../../lib/set-auth-initial-state";

/**
 * @typedef {Object} CurrentStateObject
 * @typedef {Object} ActionWithPayload
 */

/**
 * @constant
 * Initial state of auth slice
 *
 * @type {{ user: string|null; token: string|null; refresh: string|null; }}
 */
const initialState = {
  user: setAuthInitialState("user"),
  token: setAuthInitialState("token"),
  refresh: setAuthInitialState("refresh"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Reducer to set logged in user and tokens.
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
      state.token = action.payload.token;
      state.refresh = action.payload.refresh;
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", JSON.stringify(state.token));
      localStorage.setItem("refresh", JSON.stringify(state.refresh));
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
    clearCredentials: (state, action) => {
      state.user = null;
      state.token = null;
      state.refresh = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
