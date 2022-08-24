import { createSlice } from '@reduxjs/toolkit';

interface sortState {
  sortShow: boolean;
  selectShow: boolean;
}

const initialState: sortState = {
  sortShow: false,
  selectShow: false,
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
  },
});

export default sortSlice;

export const { toggleSortShow, toggleSelectShow } = sortSlice.actions;
