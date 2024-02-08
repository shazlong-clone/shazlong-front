import { createAsyncThunk } from '@reduxjs/toolkit';
import service from '../../config/userService';
import axios from 'axios';

export const getCountries = createAsyncThunk('getCountries', async () => {
  const res = await axios.get('/data/countries.json');
  return res?.data;
});
export const getLangs = createAsyncThunk('getLangs', async () => {
  const res = await axios.get('/data/lang.json');
  return res?.data;
});
export const getSpecialization = createAsyncThunk('getSpecialization', async () => {
  const res = await axios.get('/data/specialty.json');
  return res?.data;
});

export const getPrefix = createAsyncThunk('getPrefix', async () => {
  const res = await axios.get('/data/prefix.json');
  return res?.data;
});

export const getAllDoctors = createAsyncThunk('getAllDoctors', async (params) => {
  const res = await service.post('/api/v1/doctors/getAllDoctors', params);
  return res?.data;
});

export const getOnlineDoctors = createAsyncThunk('getOnlineDoctors', async () => {
  const res = await service.get('/api/v1/doctors/getOnlineDoctors');
  return res.data;
});

export const getDoctorProfile = createAsyncThunk('getDoctorProfile', async (id) => {
  const res = await service.get(`/api/v1/doctors/${id}`);
  return res.data;
});

export const getSlotsByIds = createAsyncThunk('getSlotsByIds', async (slotsIds) => {
  const res = await service.get(`/api/v1/slots/get-by-ids?slotsIds=${slotsIds}`);
  return res.data;
});
export const createReview = createAsyncThunk('createReview', async (params) => {
  const res = await service.post('/api/v1/reviews', params);
  return res.data;
});
