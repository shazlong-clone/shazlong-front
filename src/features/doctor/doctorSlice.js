import { createSlice } from '@reduxjs/toolkit';
import { getMeAsDoctor } from '../auth/authAction';
import { createSlots, getSlots } from './doctorActions';

const initialState = {
  profile: {},
  slots: [],
};
const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMeAsDoctor.fulfilled, (state, action) => {
      state.profile = action.payload?.data?.doctor;
    });
    builder.addCase(getSlots.fulfilled, (state, action) => {
      state.slots = action.payload?.data;
    });
  },
});

export default doctorSlice.reducer;
