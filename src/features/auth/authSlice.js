import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import service from '../../config/enviroment.config';

const initialState = {
  user: {},
  token: localStorage.getItem('token'),
};
export const signUp = createAsyncThunk('signUp', async (params) => {
  const res = await service.post('/api/v1/users/signup', params);
  return res.data;
});

export const signInUser = createAsyncThunk('signIn', async (params) => {
  const res = await service.post('/api/v1/users/login', params);
  return res.data;
});
export const getMe = createAsyncThunk('getMe', async () => {
  const res = await service.get('/api/v1/users/getMe');
  return res.data;
});

export const updateMe = createAsyncThunk('updateMe', async (params) => {
  const res = await service.patch('/api/v1/users/updateMe', params);
  return res.data;
});

const authSlice = createSlice({
  name: 'authSlice',
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
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
