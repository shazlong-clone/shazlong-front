import { createSlice } from '@reduxjs/toolkit';
import { getCountries, getLangs } from './sharedActions';
export const themeSlice = createSlice({
  name: 'shared',
  initialState: {
    countries: [],
    languages: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
    builder.addCase(getLangs.fulfilled, (state, action) => {
      state.languages = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function

export default themeSlice.reducer;
