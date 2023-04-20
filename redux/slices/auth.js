import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isLogin: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    postUserData: () => {},
    postUserDataSucc: (state, action) => {
      state.user = action.userData;
      state.isLogin = true;
    },
    postUserDataFail: (state, action) => {
      state.error = action.error;
    },
  },
});

export const { postUserData, postUserDataSucc, postUserDataFail } = authSlice.actions;
export default authSlice.reducer;