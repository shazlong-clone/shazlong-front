import { createSlice } from '@reduxjs/toolkit';
import {
  getAllDoctors,
  getCountries,
  getLangs,
  getOnlineDoctors,
  getPrefix,
  getSpecialization,
  getDoctorProfile,
  getSlotsByIds,
  getpsychoTests,
  getFeaturedDoctor,
} from './sharedActions';
export const sharedSlice = createSlice({
  name: 'shared',
  initialState: {
    countries: [],
    languages: [],
    specializationList: [],
    doctors: {},
    prefixesList: [],
    doctorSearchLoading: false,
    searchTherapistSideBarOpen: false,
    doctorSearchParams: {},
    onlineDoctors: [],
    doctorProfile: {},
    checkoutSlots: [],
    psychometerTests: [],
    featuredDoctors: [],
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
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
    builder.addCase(getLangs.fulfilled, (state, action) => {
      state.languages = action.payload;
    });
    builder.addCase(getSpecialization.fulfilled, (state, action) => {
      state.specializationList = action.payload;
    });
    builder.addCase(getPrefix.fulfilled, (state, action) => {
      state.prefixesList = action.payload;
    });
    builder.addCase(getAllDoctors.fulfilled, (state, action) => {
      if (action?.payload?.data?.currentPage === 1) {
        state.doctors = action.payload.data;
      } else {
        const oldDoctors = state?.doctors?.result ?? [];
        const newDoctors = action?.payload?.data?.result ?? [];
        const allDoctors = [...oldDoctors, ...newDoctors];
        state.doctors = { ...action.payload?.data, result: allDoctors };
      }
    });
    builder.addCase(getOnlineDoctors.fulfilled, (state, action) => {
      state.onlineDoctors = action.payload?.data.results;
    });
    builder.addCase(getDoctorProfile.fulfilled, (state, action) => {
      state.doctorProfile = action.payload?.data;
    });
    builder.addCase(getSlotsByIds.fulfilled, (state, action) => {
      state.checkoutSlots = action.payload?.data;
    });
    builder.addCase(getpsychoTests.fulfilled, (state, action) => {
      state.psychometerTests = action.payload;
    });
    builder.addCase(getFeaturedDoctor.fulfilled, (state, action) => {
      state.featuredDoctors = action.payload?.data.result ?? [];
    });
  },
});

export const { setDoctorSearchParams, setDoctorSearchLoading, setSearchTherapistSideBarOpen } = sharedSlice.actions;
// Action creators are generated for each case reducer function

export default sharedSlice.reducer;
