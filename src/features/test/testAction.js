import { createAsyncThunk } from '@reduxjs/toolkit';
import service from '../../config/userService';

export const getpsychoTests = createAsyncThunk('getpsychoTests', async () => {
  const res = await service.get('/api/v1/tests');
  return res?.data;
});
export const getTestById = createAsyncThunk('getTestById', async (id) => {
  const res = await service.get(`/api/v1/tests/${id}`);
  return res?.data;
});
