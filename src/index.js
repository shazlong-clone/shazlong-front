import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/main.css';
// import './assets/css/main-rtl.css';
import 'flag-icons/css/flag-icons.css';
import './i18n';

import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
const root = ReactDOM.createRoot(document.getElementById('root'));

const themes = {
  ltr: './src/asstes/css/main.css',
  rtl: './src/asstes/css/main-rtl.css',
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeSwitcherProvider defaultTheme="ltr" themeMap={themes}>
          <App />
        </ThemeSwitcherProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
