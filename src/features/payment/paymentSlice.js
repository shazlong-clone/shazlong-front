import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import service from '../../config/enviroment.config';

const initialState = {
  card: '',
  vodaphoneCash: '',
  fawry: '',
};

export const createOrUpdatePayemnt = createAsyncThunk('createOrUpdatePayemnt', async (params) => {
  const res = await service.post('/api/v1/payment', params);
  return res.data;
});
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createOrUpdatePayemnt.fulfilled, (state, action) => {
      console.log('ssssssssssssssssssssssssssss');
    });
  },
});

export default paymentSlice;
