import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import hospitalReducer from './slices/hospitalSlice';

const STATE_VERSION = 1;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: STATE_VERSION,
};

const persistedReducer = persistReducer(persistConfig, hospitalReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

export {persistor, store};
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
