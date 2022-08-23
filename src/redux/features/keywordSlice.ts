import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface KeywordState {
  keyword: string;
}

const initialState: KeywordState = {
  keyword: '검색항목을 입력해주세요.',
};

const keywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    keywordAction: (state, action: PayloadAction<KeywordState>) => {
      state.keyword = action.payload.keyword;
    },
  },
});

export default keywordSlice;
