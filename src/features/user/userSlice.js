import { createSlice } from '@reduxjs/toolkit';
import { getSessions, getUserTest } from './userActions';
export const sharedSlice = createSlice({
  name: 'shared',
  initialState: {
    sessions: [],
    tests:{}
  },

  reducers: {
    setDoctorSearchParams: (state, action) => {
      state.doctorSearchParams = action?.payload;
    },

    setDoctorSearchLoading: (state, action) => {
      state.doctorSearchLoading = action?.payload;
    },
    setSearchTherapistSideBarOpen: (state, action) => {
      state.searchTherapistSideBarOpen = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSessions.fulfilled, (state, action) => {
      state.sessions = action.payload?.data;
    });
    builder.addCase(getUserTest.fulfilled, (state, action) => {
      state.tests = action.payload?.data;
    });
  },
});

export const { setDoctorSearchParams, setDoctorSearchLoading, setSearchTherapistSideBarOpen } = sharedSlice.actions;
// Action creators are generated for each case reducer function

export default sharedSlice.reducer;
