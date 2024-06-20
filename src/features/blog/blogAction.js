import { createAsyncThunk } from '@reduxjs/toolkit';
import service from '../../config/userService';

export const getBlogs = createAsyncThunk('getBlogs', async (params) => {
  const res = await service.get('/api/v1/blogs', { params });
  return res.data;
});
export const getBlog = createAsyncThunk('getBlog', async (id) => {
  const res = await service.get(`/api/v1/blogs/${id}`);
  return res.data;
});
