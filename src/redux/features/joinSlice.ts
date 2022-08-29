import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AddressState {
  postId: number;
  matchStatus?: string;
}

const initialState: AddressState = {
  postId: 0,
  matchStatus: 'ONGOING',
};

const joinSlice = createSlice({
  name: 'join',
  initialState,
  reducers: {
    joinAction: (state, action: PayloadAction<AddressState>) => {
      state.postId = action.payload.postId;
      state.matchStatus = action.payload.matchStatus;
    },
    joinClear: () => initialState,
  },
});

export default joinSlice;

export const { joinAction, joinClear } = joinSlice.actions;
