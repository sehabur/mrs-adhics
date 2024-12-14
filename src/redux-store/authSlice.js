import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    login: (state, { payload }) => {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          _id: payload._id,
          token: payload.token,
        })
      );
      return payload;
    },

    logout: () => {
      localStorage.removeItem("userInfo");
      return null;
    },

    updateProfile: (state, { payload }) => {
      const newState = {
        ...state,
        name: payload.name,
        email: payload.email,
      };
      return newState;
    },
  },
});

export default authSlice;
