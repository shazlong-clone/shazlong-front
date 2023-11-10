import { createSlice } from '@reduxjs/toolkit';
import { getAllDoctors, getCountries, getLangs, getPrefix, getSpecialization } from './sharedActions';
export const themeSlice = createSlice({
  name: 'shared',
  initialState: {
    countries: [],
    languages: [],
    specializationList: [],
    doctors: {},
    prefixesList: [],
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

// Action creators are generated for each case reducer function

export default themeSlice.reducer;
