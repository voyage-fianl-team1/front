import { createSlice } from '@reduxjs/toolkit';

interface sortState {
  sortShow: boolean;
  selectShow: boolean;
  modalShow: boolean;
  subjectShow: boolean;
  calendarShow: boolean;
}

const initialState: sortState = {
  sortShow: false,
  selectShow: false,
  modalShow: false,
  subjectShow: false,
  calendarShow: false,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleSortShow: (state) => {
      state.sortShow = !state.sortShow;
    },
    toggleSelectShow: (state) => {
      state.selectShow = !state.selectShow;
    },
    toggleModalShow: (state) => {
      state.modalShow = !state.modalShow;
    },
    toggleSubjectShow: (state) => {
      state.subjectShow = !state.subjectShow;
    },
    toggleCalendarShow: (state) => {
      state.calendarShow = !state.calendarShow;
    },
    toggleClear: () => initialState,
  },
});

export default toggleSlice;

export const { toggleSortShow, toggleSelectShow, toggleModalShow, toggleClear, toggleSubjectShow, toggleCalendarShow } =
  toggleSlice.actions;
