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
  },
});

// Action creators are generated for each case reducer function
export const { openChat, closeChat } = themeSlice.actions;

export default themeSlice.reducer;
