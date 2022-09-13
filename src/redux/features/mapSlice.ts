import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AddressState {
  sw: string;
  ne: string;
}

const initialState: AddressState = {
  sw: '',
  ne: '',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    mapAction: (state, action: PayloadAction<AddressState>) => {
      state.sw = action.payload.sw;
      state.ne = action.payload.ne;
    },
    mapClear: () => initialState,
  },
});

export default mapSlice;

export const { mapAction, mapClear } = mapSlice.actions;
