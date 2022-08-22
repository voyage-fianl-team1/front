import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import commonSlice from './features/commonSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    common: commonSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
