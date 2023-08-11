import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import service from '../../config/enviroment.config';

const initialState = {
  user: {},
  token: '',
  error: '',
};
export const signUp = createAsyncThunk('signUp', async (params) => {
  const res = await service.post('api/clubs', params);
  return res.data;
});
const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.loading = true;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});
export default authSlice.reducer;
