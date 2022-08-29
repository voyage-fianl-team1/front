import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SubjectState {
  subject: string;
  value: string;
}

const initialState: SubjectState = {
  subject: '종목을 선택해주세요.',
  value: 'ALL',
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    subjectAction: (state, action: PayloadAction<SubjectState>) => {
      state.subject = action.payload.subject;
      state.value = action.payload.value;
    },
    subjectClear: () => initialState,
  },
});

export default subjectSlice;

export const { subjectAction, subjectClear } = subjectSlice.actions;
