import { createAsyncThunk } from '@reduxjs/toolkit';
import service from '../../config/userService';
import doctorService from '../../config/doctorService';

export const getBlogs = createAsyncThunk('getBlogs', async (params) => {
  const res = await service.get('/api/v1/blogs', { params });
  return res.data;
});
export const getBlog = createAsyncThunk('getBlog', async (id) => {
  const res = await service.get(`/api/v1/blogs/${id}`);
  return res.data;
});
export const addAricle = createAsyncThunk('addAricle', async (params) => {
  const res = await doctorService.post('/api/v1/blogs', params);
  return res.data;
});
export const deleteBlog = createAsyncThunk('deleteBlog', async (params) => {
  const res = await doctorService.delete('/api/v1/blogs', { params });
  return res.data;
});
