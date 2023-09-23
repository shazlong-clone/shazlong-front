import { createSlice } from '@reduxjs/toolkit';
import { signUp, signInUser, getMe, updateMe, signUpDoctor, verificate, getMeAsDoctor, signInDoctor } from './authAction';
const initialState = {
  user: {},
  doctor: {},
  token: localStorage.getItem('token') || '',
  doctorVerificationCode: localStorage.getItem('doctorVerificationCode') || '',
  doctorToken: localStorage.getItem('doctorToken') || '',
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
    doctorSignOut: (state) => {
      state.doctorToken = '';
      state.doctor = {};
      localStorage.setItem('doctorToken', '');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      if (action?.payload?.token) {
        state.token = action?.payload?.token;
        state.user = action?.payload?.data?.user;
      }
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.token = action?.payload?.token;
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
    builder.addCase(verificate.fulfilled, (state, action) => {
      if (action?.payload?.token) {
        state.doctorToken = action?.payload?.token;
        state.doctor = action.payload.data.user;
        state.doctorVerificationCode = '';
      }
    });
    builder.addCase(getMeAsDoctor.fulfilled, (state, action) => {
      if (action?.payload?.token) {
        state.doctorToken = action?.payload?.token;
        state.doctor = action.payload.data.user;
        state.doctorVerificationCode = '';
      }
    });
    builder.addCase(signInDoctor.fulfilled, (state, action) => {
      state.doctorToken = action?.payload?.token;
      state.doctor = action?.payload?.data?.user;
    });
  },
});

export const { signOut, doctorSignOut } = authSlice.actions;
export default authSlice.reducer;
