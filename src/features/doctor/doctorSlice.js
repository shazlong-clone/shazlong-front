import { createSlice } from '@reduxjs/toolkit';
import { getMeAsDoctor } from '../auth/authAction';

const initialState = {
  profile: {},
};
const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMeAsDoctor.fulfilled, (state, action) => {
      state.profile = action.payload?.data?.doctor;
    });
  },
});

export default doctorSlice.reducer;
