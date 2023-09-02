import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import service from '../../config/enviroment.config';

const initialState = {
  user: {},
  token: '',
};
export const signUp = createAsyncThunk('signUp', async (params) => {
  const res = await service.post('/api/v1/users/signup', params);
  return res.data;
});
const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
  },
});
export default authSlice.reducer;
