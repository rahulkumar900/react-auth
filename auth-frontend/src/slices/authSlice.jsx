import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = null;
      // localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateUserStart: (state) => {
      state.loading = true;
    },
    updateuserSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateuserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = false;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // logout: (state) => {
    //   state.userInfo = null;
    //   // localStorage.removeItem("userInfo");
    // },
  },
});

export default authSlice.reducer;
export const {
  signInStart,
  setCredentials,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  deleteUserSuccess,
} = authSlice.actions;
