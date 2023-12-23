import { createSlice } from '@reduxjs/toolkit';
import { getAllDoctors, getCountries, getLangs, getOnlineDoctors, getPrefix, getSpecialization } from './sharedActions';
import { ASC } from '../../costansts/index';
export const sharedSlice = createSlice({
  name: 'shared',
  initialState: {
    countries: [],
    languages: [],
    specializationList: [],
    doctors: {},
    prefixesList: [],
    doctorCurrentPageSize: 6,
    doctorSearchLoading: false,
    searchTherapistSideBarOpen: false,
    doctorSearchParams: {
      amount: [0, 500],
      availability: null,
      country: [],
      specialization: [],
      gender: null,
      languages: [],
      rate: null,
      name: '',
      sortBy: '',
      sort: ASC,
      page: 1,
      size: 6,
    },
    onlineDoctors: [],
  },

  reducers: {
    setDoctorSearchParams: (state, action) => {
      state.doctorSearchParams = action?.payload;
    },
    setCurrentDoctorPageSize: (state, action) => {
      state.doctorCurrentPageSize = action?.payload;
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
      state.doctors = action.payload?.data;
    });
    builder.addCase(getOnlineDoctors.fulfilled, (state, action) => {
      state.onlineDoctors = action.payload?.data.results;
    });
  },
});

export const { setDoctorSearchParams, setCurrentDoctorPageSize, setDoctorSearchLoading, setSearchTherapistSideBarOpen } =
  sharedSlice.actions;
// Action creators are generated for each case reducer function

export default sharedSlice.reducer;
