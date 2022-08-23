import { createSlice } from '@reduxjs/toolkit';

interface selectState {
  selectShow: boolean;
}

const initialState: selectState = {
  selectShow: false,
};

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    toggleSelectShow: (state) => {
      state.selectShow = !state.selectShow;
    },
  },
});

export default selectSlice;

export const { toggleSelectShow } = selectSlice.actions;
