import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isChatOpen: false,
    locale: localStorage.getItem('i18nextLng'),
    activeSideBar: '',
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
    },
    setActiveSideBar: (state, action) => {
      state.activeSideBar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openChat, closeChat, changeLang, setActiveSideBar } = themeSlice.actions;

export default themeSlice.reducer;
