import { createAsyncThunk } from '@reduxjs/toolkit';
import service from '../../config/enviroment.config';

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

export const signUpDoctor = createAsyncThunk('doctorSignUp', async (params) => {
  const res = await service.post('/api/v1/doctors/signup', params);
  return res.data;
});
