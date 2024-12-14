import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
  });
};

export const authActions = authSlice.actions;
