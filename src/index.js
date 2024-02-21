import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'flag-icons/css/flag-icons.css';
import './index.css';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from './components/Shared/ErrorBoundary';
import LangWrapper from './components/Shared/LangWrapper';
import Loading from './components/Shared/BackDropLoading';

const root = ReactDOM.createRoot(document.getElementById('root'));

const themes = {
  ltr: '/css/main.css',
  rtl: '/css/main-rtl.css',
};

root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeSwitcherProvider
            insertionPoint={document.getElementById('inject-styles-here')}
            defaultTheme="ltr"
            themeMap={themes}
          >
            <Suspense fallback={<Loading />}>
              <LangWrapper>
                <App />
              </LangWrapper>
            </Suspense>
          </ThemeSwitcherProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>,
);
