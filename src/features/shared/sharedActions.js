import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
