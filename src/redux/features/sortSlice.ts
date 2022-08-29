import { createSlice } from '@reduxjs/toolkit';

interface sortState {
  sortShow: boolean;
  selectShow: boolean;
  modalShow: boolean;
  subjectShow: boolean;
}

const initialState: sortState = {
  sortShow: false,
  selectShow: false,
  modalShow: false,
  subjectShow: false,
};

const sortSlice = createSlice({
  name: 'sort',
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
    toggleClear: () => initialState,
  },
});

export default sortSlice;

export const { toggleSortShow, toggleSelectShow, toggleModalShow, toggleClear, toggleSubjectShow } = sortSlice.actions;
