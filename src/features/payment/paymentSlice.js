import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import service from '../../config/userService';

const initialState = {
  card: '',
  vodafoneCash: '',
  fawry: '',
};
export const createOrUpdatePayment = createAsyncThunk('createOrUpdatePayment', async (params) => {
  const res = await service.post('/api/v1/payment', params);
  return res.data;
});
export const getPayment = createAsyncThunk('getPayment', async () => {
  const res = await service.get('/api/v1/payment');
  return res.data;
});

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createOrUpdatePayment.fulfilled, (state, action) => {
      state.card = action.payload.data?.payment?.card;
      state.vodafoneCash = action.payload.data?.payment?.vodafoneCash;
      state.fawry = action.payload.data?.payment?.fawry;
    });
    builder.addCase(getPayment.fulfilled, (state, action) => {
      state.card = action.payload.data?.payment?.card;
      state.vodafoneCash = action.payload.data?.payment?.vodafoneCash;
      state.fawry = action.payload.data?.payment?.fawry;
    });
  },
});

export default paymentSlice.reducer;
