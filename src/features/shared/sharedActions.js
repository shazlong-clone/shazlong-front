import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCountries = createAsyncThunk('getCountries', async () => {
  const data = await axios.get('/api/countries.json');
  return data;
});
