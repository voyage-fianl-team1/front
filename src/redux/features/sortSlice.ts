import { createSlice } from '@reduxjs/toolkit';

interface sortState {
  sortShow: boolean;
  selectShow: boolean;
  modalShow: boolean;
}

const initialState: sortState = {
  sortShow: false,
  selectShow: false,
  modalShow: false,
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
    toggleClear: () => initialState,
  },
});

export default sortSlice;

export const { toggleSortShow, toggleSelectShow, toggleModalShow, toggleClear } = sortSlice.actions;
