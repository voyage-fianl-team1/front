import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalendarState {
  date: string;
}

const initialState: CalendarState = {
  date: '모집 마감일을 선택해 주세요.',
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    calendarAction: (state, action: PayloadAction<CalendarState>) => {
      state.date = action.payload.date;
    },
    calendarClear: () => initialState,
  },
});

export default calendarSlice;

export const { calendarAction, calendarClear } = calendarSlice.actions;
