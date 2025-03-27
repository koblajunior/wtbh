// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage
import authReducer from './authSlice';
import progressReducer from './progressSlice';

const persistConfig = {
  key: 'auth', // Key for storage
  storage, // Use local storage
  whitelist: ['user', 'token'], // Persist only these fields
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    progress: progressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore non-serializable warnings from redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
