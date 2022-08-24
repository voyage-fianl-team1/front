import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PositionState {
  lat: number;
  lng: number;
  isLoading: boolean;
}

const initialState: PositionState = {
  lat: 0,
  lng: 0,
  isLoading: false,
};

const positionSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    positionAction: (state, action: PayloadAction<PositionState>) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.isLoading = action.payload.isLoading;
    },
  },
});

export default positionSlice;

export const { positionAction } = positionSlice.actions;
