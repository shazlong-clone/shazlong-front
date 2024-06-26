import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeSlice from '../features/theme/themeSlice';
import authSlice from '../features/auth/authSlice';
import paymentSlice from '../features/payment/paymentSlice';
import sharedSlice from '../features/shared/sharedSlice';
import doctorSlice from '../features/doctor/doctorSlice';
import userSlice from '../features/user/userSlice';
import testSlice from '../features/test/testSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'shazlong',
  storage,
};
const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
  payment: paymentSlice,
  shared: sharedSlice,
  doctor: doctorSlice,
  user: userSlice,
  test: testSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
