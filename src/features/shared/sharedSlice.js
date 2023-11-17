import { createSlice } from '@reduxjs/toolkit';
import { getAllDoctors, getCountries, getLangs, getPrefix, getSpecialization } from './sharedActions';
export const sharedSlice = createSlice({
  name: 'shared',
  initialState: {
    countries: [],
    languages: [],
    specializationList: [],
    doctors: {},
    prefixesList: [],
    doctorCurrentPageSize: 6,
    doctorSearchParams: {
      amount: [0, 500],
      availability: null,
      country: [],
      specialization: [],
      gender: null,
      languages: [],
      rate: null,
    },
  },
  reducers: {
    setDoctorSearchParams: (state, action) => {
      state.doctorSearchParams = action?.payload;
    },
    setCurrentDoctorPageSize: (state, action) => {
      state.doctorCurrentPageSize = action?.payload;
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
  },
});

export const { setDoctorSearchParams, setCurrentDoctorPageSize } = sharedSlice.actions;
// Action creators are generated for each case reducer function

export default sharedSlice.reducer;
