import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import userSlice from './features/userSlice';
import addressSlice from './features/addressSlice';
import commonSlice from './features/commonSlice';
import keywordSlice from './features/keywordSlice';
import toggleSlice from './features/toggleSlice';
import searchSlice from './features/searchSlice';
import overlaySlice from './features/overlaySlice';
import positionSlice from './features/postionSlice';
import calendarSlice from './features/calendarSlice';
import subjectSlice from './features/subjectSlice';
import notificationSlice from './features/notificationSlice';
import mapSlice from './features/mapSlice';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['position', 'join'],
};

const reducers = combineReducers({
  position: positionSlice.reducer,
  map: mapSlice.reducer,
});

const persistReducered = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    address: addressSlice.reducer,
    common: commonSlice.reducer,
    keyword: keywordSlice.reducer,
    toggle: toggleSlice.reducer,
    search: searchSlice.reducer,
    overlay: overlaySlice.reducer,
    calendar: calendarSlice.reducer,
    subject: subjectSlice.reducer,
    persistReducered,
    notification: notificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
