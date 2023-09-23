import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeSlice from '../features/theme/themeSlice';
import authSlice from '../features/auth/authSlice';
import paymentSlice from '../features/payment/paymentSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'shazlong',
  storage,
};
const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
  payment: paymentSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
