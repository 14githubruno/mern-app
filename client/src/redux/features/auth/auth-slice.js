import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  tokenExpirationDate: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.tokenExpirationDate = action.payload.tokenExpirationDate;
    },
    setOnlyCredentialsUser: (state, action) => {
      state.user = action.payload.user;
    },
    clearCredentials: (state, action) => {
      state.user = null;
      state.tokenExpirationDate = null;
    },
  },
});

export const { setCredentials, setOnlyCredentialsUser, clearCredentials } =
  authSlice.actions;
export default authSlice.reducer;
