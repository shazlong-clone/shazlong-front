import { createAsyncThunk } from '@reduxjs/toolkit';
import service from '../../config/userService';

export const getCountries = createAsyncThunk('getCountries', async () => {
  const res = await service.get('/data/countries.json');
  return res?.data;
});
export const getLangs = createAsyncThunk('getLangs', async () => {
  const res = await service.get('/data/lang.json');
  return res?.data;
});
export const getSpecialization = createAsyncThunk('getSpecialization', async () => {
  const res = await service.get('/data/specialty.json');
  return res?.data;
});

export const getPrefix = createAsyncThunk('getPrefix', async () => {
  const res = await service.get('/data/prefix.json');
  return res?.data;
});

export const getAllDoctors = createAsyncThunk('getAllDoctors', async () => {
  const res = await service.get('/api/v1/doctors/getAllDoctors');
  return res?.data;
});
