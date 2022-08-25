import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AddressState {
  address?: string;
  lat: number;
  lng: number;
}

const initialState: AddressState = {
  address: '주소를 선택해 주세요.',
  lat: 0,
  lng: 0,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addressAction: (state, action: PayloadAction<AddressState>) => {
      state.address = action.payload.address;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    addressClear: () => initialState,
  },
});

export default addressSlice;

export const { addressAction, addressClear } = addressSlice.actions;
