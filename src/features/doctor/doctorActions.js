import { createAsyncThunk } from '@reduxjs/toolkit';
import doctorService from '../../config/doctorService';
export const updateDoctorProfile = createAsyncThunk('updateDoctorProfile', async (params) => {
  const res = await doctorService.patch('/api/v1/doctors/updateMe', params);
  return res.data;
});
export const getMeAsDoctor = createAsyncThunk('getMeAsDoctor', async () => {
  const res = await doctorService.get('/api/v1/doctors/getMe');
  return res.data;
});
export const addOrUpdateDoctorExperience = createAsyncThunk('addOrUpdateDoctorExperience', async (params) => {
  const res = await doctorService.post('/api/v1/doctors/addOrUpdateDoctorExperience', params);
  return res.data;
});

export const deleteExperienceById = createAsyncThunk('deleteExperienceById', async (id) => {
  const res = await doctorService.delete(`/api/v1/doctors/deleteExperienceById/${id}`);
  return res.data;
});
