import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import service from '../../config/enviroment.config';

const initialState = {
  user: {},
  token: '',
};
export const signUp = createAsyncThunk('signUp', async (params) => {
  const res = await service.post('/api/v1/users/signup', params);
  return res.data;
});

export const signInUser = createAsyncThunk('signIn', async (params) => {
  const res = await service.post('/api/v1/users/signin', params);
  return res.data;
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.data.user;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action?.payload?.data?.user;
    });
  },
});

export default authSlice.reducer;
