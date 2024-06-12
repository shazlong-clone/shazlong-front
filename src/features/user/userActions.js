import { createAsyncThunk } from '@reduxjs/toolkit';
import service from '../../config/userService';

export const getSessions = createAsyncThunk('getSessions', async (params) => {
  const res = await service.get('/api/v1/users/bookings', { params });
  return res.data;
});
export const cancelSession = createAsyncThunk('cancelSession', async (params) => {
  const res = await service.post('/api/v1/booking/cancel', params);
  return res.data;
});
export const getUserTest = createAsyncThunk('getUserTest', async (params) => {
  const res = await service.get('/api/v1/tests/user-test', { params });
  return res?.data;
});
export const deleteUserTest = createAsyncThunk('deleteUserTest', async (id) => {
  const res = await service.delete(`/api/v1/tests/user-test/${id}`);
  return res?.data;
});

export const getUserTestById = createAsyncThunk('deleteUserTest', async (id) => {
  const res = await service.get(`/api/v1/tests/user-test/${id}`);
  return res?.data;
});
 
