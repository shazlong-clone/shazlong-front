import { createSlice } from '@reduxjs/toolkit';
import { getCountries } from './sharedActions';
export const themeSlice = createSlice({
  name: 'shared',
  initialState: {
    countries: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = action.payload?.data;
    });
  },
});

// Action creators are generated for each case reducer function

export default themeSlice.reducer;
