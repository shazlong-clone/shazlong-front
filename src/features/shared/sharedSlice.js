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
  getFeaturedDoctor,
  getReviews,
} from './sharedActions';
import moment from 'moment';
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
    featuredDoctors: [],
    reviews: {},
    sideBarOpen: false,
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
    handelSideBar: (state, action) => {
      state.sideBarOpen = action?.payload;
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
    builder.addCase(getFeaturedDoctor.fulfilled, (state, action) => {
      state.featuredDoctors = action.payload?.data.result ?? [];
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.reviews = action.payload?.data ?? {};
    });
  },
});

export const { setDoctorSearchParams, setDoctorSearchLoading, setSearchTherapistSideBarOpen, handelSideBar } =
  sharedSlice.actions;
// Action creators are generated for each case reducer function

export default sharedSlice.reducer;
