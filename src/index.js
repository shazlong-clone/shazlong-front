import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'flag-icons/css/flag-icons.css';
import './index.css';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './app/store';
import { Provider } from 'react-redux';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { PersistGate } from 'redux-persist/integration/react';
import LocalizeRsuit from './components/Shared/LocalizeRsuit';
import ErrorBoundary from './components/Shared/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));

const themes = {
  ltr: '/css/main.css',
  rtl: '/css/main-rtl.css',
};

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeSwitcherProvider insertionPoint="inject-styles-here" defaultTheme="ltr" themeMap={themes}>
              <LocalizeRsuit>
                <App />
              </LocalizeRsuit>
            </ThemeSwitcherProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
