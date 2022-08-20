import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import addressSlice from './features/addressSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    address: addressSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
