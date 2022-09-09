import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchState {
  sort?: string;
  subject?: string;
}

const initialState: searchState = {
  sort: 'createAt',
  subject: 'ALL',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    sortSearchShow: (state, action: PayloadAction<searchState>) => {
      state.sort = action.payload.sort;
    },
    sortSearchShowClear: () => initialState,
    subjectSearchShow: (state, action: PayloadAction<searchState>) => {
      state.subject = action.payload.subject;
    },
    subjectSearchShowClear: () => initialState,
  },
});

export default searchSlice;

export const { sortSearchShow, subjectSearchShow, subjectSearchShowClear, sortSearchShowClear } = searchSlice.actions;
