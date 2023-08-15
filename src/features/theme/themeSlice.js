import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isChatOpen: false,
  },
  reducers: {
    openChat: (state) => {
      state.isChatOpen = true;
    },
    closeChat: (state) => {
      state.isChatOpen = false;
    },
    changeLang: (state, action) => {
      state.locale = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { openChat, closeChat, changeLang } = themeSlice.actions;

export default themeSlice.reducer;
