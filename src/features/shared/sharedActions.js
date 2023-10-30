import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import service from '../../config/userService';

export const getCountries = createAsyncThunk('getCountries', async () => {
  const res = await axios.get('/api/countries.json');
  return res?.data;
});
export const getLangs = createAsyncThunk('getLangs', async () => {
  const res = await axios.get('/api/lang.json');
  return res?.data;
});
export const getSpecialization = createAsyncThunk('getSpecialization', async () => {
  const res = await axios.get('/api/specialty.json');
  return res?.data;
});

export const getAllDoctors = createAsyncThunk('getAllDoctors', async () => {
  const res = await service('/api/v1/doctors/getAllDoctors');
  return res?.data;
});
