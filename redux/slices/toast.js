import { createSlice } from '@reduxjs/toolkit';
import toastTypes from '@/constants/toastTypes';

const initialState = {
  type: toastTypes.NONE,
  error: null,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action) {
      const { type } = action.payload;
      state.type = type;
      if (error) {
        state.error = action.payload.error;
      }
    },
    hideToast(state) {
      state.type = toastTypes.NONE;
    },
  },
});

export const toastActions = toastSlice.actions;
export default toastSlice.reducer;
