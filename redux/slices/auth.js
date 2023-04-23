import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isLogin: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserData: (_, action) => {
      state.isLoading = true;
    },
    postSignIn: (state, action) => {
      state.isLoading = true;
    },
    postSignUp: (state, action) => {
      state.isLoading = true;
    },
    postSignOut: (state, action) => {
      state.isLoading = true;
    },
    putUserData: (_, action) => {
      state.isLoading = true;
    },
    deleteUser: (_, action) => {
      state.isLoading = true;
    },

    postGoogleSignIn: () => {},
    postFacebookSignIn: () => {},

    getUserDataSucc: (state, action) => {
      state.user = action.payload.userData;
      state.isLoading = false;
    },
    getUserDataFail: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    postSignInSucc: (state, action) => {
      state.user = action.payload.userData;
      state.isLogin = true;
      state.isLoading = false;
    },
    postSignInFail: (state, action) => {
      state.error = action.payload.error;
      state.isLogin = false;
      state.isLoading = false;
    },
    postSignUpSucc: (state) => {
      state.isLoading = false;
    },
    postSignUpFail: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    postSignOutSucc: (state) => {
      state.user = {};
      state.isLogin = false;
      state.isLoading = false;
    },
    postSignOutFail: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    putUserDataSucc: (state, action) => {
      state.user = { ...state.user, ...action.payload.userData };
      state.isLoading = false;
    },
    putUserDataFail: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    deleteUserSucc: (state) => {
      state.user = {};
      state.isLogin = false;
      state.isLoading = false;
    },
    deleteUserFail: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },

    postGoogleSignInSucc: (state, action) => {
      state.user = action.payload.user;
    },
    postGoogleSignInFail: (state, action) => {
      state.error = action.payload.error;
    },
    postFacebookSignInSucc: (state, action) => {
      state.user = action.payload.user;
    },
    postFacebookSignInFail: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
