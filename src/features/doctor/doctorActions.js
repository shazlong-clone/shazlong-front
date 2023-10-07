import { createAsyncThunk } from '@reduxjs/toolkit';
import doctorService from '../../config/doctorService';
export const updateDoctorProfile = createAsyncThunk('updateDoctorProfile', async (params) => {
  const res = await doctorService.patch('/api/v1/doctors/updateMe', params);
  return res.data;
});
export const geMeAsDoctor = createAsyncThunk('geMeAsDoctor', async () => {
  const res = await doctorService.get('/api/v1/doctors/getMe');
  return res.data;
});
