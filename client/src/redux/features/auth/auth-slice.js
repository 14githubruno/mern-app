import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  tokenExpDate: JSON.parse(localStorage.getItem("exp")) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.tokenExpDate = action.payload.tokenExpDate;
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("exp", JSON.stringify(state.tokenExpDate));
    },

    setOnlyCredentialsUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    clearCredentials: (state, action) => {
      state.user = null;
      state.tokenExpDate = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, setOnlyCredentialsUser, clearCredentials } =
  authSlice.actions;
export default authSlice.reducer;
