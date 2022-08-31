import { createSlice } from '@reduxjs/toolkit';

interface sortState {
  sortShow: boolean;
  selectShow: boolean;
  modalShow: boolean;
  modal2Show: boolean;
  subjectShow: boolean;
  calendarShow: boolean;
}

const initialState: sortState = {
  sortShow: false,
  selectShow: false,
  modalShow: false,
  modal2Show: false,
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
    toggleModal2Show: (state) => {
      state.modal2Show = !state.modal2Show;
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

export const {
  toggleSortShow,
  toggleSelectShow,
  toggleModalShow,
  toggleModal2Show,
  toggleClear,
  toggleSubjectShow,
  toggleCalendarShow,
} = toggleSlice.actions;
