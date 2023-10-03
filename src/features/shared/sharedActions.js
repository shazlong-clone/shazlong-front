import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCountries = createAsyncThunk('getCountries', async () => {
  const data = await axios.get('/api/countries.json');
  return data;
});
export const getLangs = createAsyncThunk('getLangs', async () => {
  const data = await axios.get('/api/lang.json');
  return data;
});
