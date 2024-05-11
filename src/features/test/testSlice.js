import { createSlice } from '@reduxjs/toolkit';
import { getTestById, getpsychoTests } from './testAction';
export const sharedSlice = createSlice({
  name: 'tests',
  initialState: {
    tests: [],
    test: {},
  },

  extraReducers: (builder) => {
    builder.addCase(getpsychoTests.fulfilled, (state, action) => {
      state.tests = action.payload?.data;
    });
    builder.addCase(getTestById.fulfilled, (state, action) => {
      state.test = action.payload?.data;
    });
    builder.addCase(getTestById.rejected, (state) => {
      state.test = {};
    });
  },
});

export const { setDoctorSearchParams, setDoctorSearchLoading, setSearchTherapistSideBarOpen } = sharedSlice.actions;
// Action creators are generated for each case reducer function

export default sharedSlice.reducer;
