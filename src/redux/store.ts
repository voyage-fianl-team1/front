import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import addressSlice from './features/addressSlice';
import commonSlice from './features/commonSlice';
import keywordSlice from './features/keywordSlice';
import sortSlice from './features/sortSlice';
import searchSlice from './features/searchSlice';
import overlaySlice from './features/overlaySlice';
import positionSlice from './features/postionSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    address: addressSlice.reducer,
    common: commonSlice.reducer,
    keyword: keywordSlice.reducer,
    sort: sortSlice.reducer,
    search: searchSlice.reducer,
    overlay: overlaySlice.reducer,
    position: positionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
