import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../typings';

interface initialStateType {
  notifications: Notification[];
}

const initialState: initialStateType = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    append: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
  },
});

export default notificationSlice;

export const { append, setNotifications } = notificationSlice.actions;
