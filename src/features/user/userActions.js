import { createAsyncThunk } from '@reduxjs/toolkit';
import service from '../../config/userService';

export const setSessions = createAsyncThunk('getUserBookings', async (params) => {
  const res = await service.get('/api/v1/users/bookings', params);
  return res.data;
});
