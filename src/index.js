import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'flag-icons/css/flag-icons.css';
import './index.css';
import './i18n';

import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
const root = ReactDOM.createRoot(document.getElementById('root'));

const themes = {
  ltr: '/css/main.css',
  rtl: '/css/main-rtl.css',
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeSwitcherProvider insertionPoint='inject-styles-here'  defaultTheme="ltr" themeMap={themes}>
          <App />
        </ThemeSwitcherProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
