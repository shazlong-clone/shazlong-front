import { createSlice } from '@reduxjs/toolkit';
import { signUp, signInUser, getMe, updateMe, signUpDoctor } from './authAction';
const initialState = {
  user: {},
  token: localStorage.getItem('token') || '',
  doctorVerificationCode: localStorage.getItem('doctorVerificationCode') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = '';
      state.user = {};
      localStorage.setItem('token', '');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.data.user;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action?.payload?.data?.user;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action?.payload?.data?.user;
    });
    builder.addCase(updateMe.fulfilled, (state, action) => {
      state.user = action?.payload?.data?.user;
    });
    builder.addCase(signUpDoctor.fulfilled, (state, action) => {
      state.doctorVerificationCode = action?.payload?.code;
    });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
