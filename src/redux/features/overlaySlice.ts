import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OverlayState {
  title: string;
  address: string;
  imgUrl: string;
  lat: number;
  lng: number;
  postId: number;
  subject: string;
}

const initialState: OverlayState = {
  title: '',
  address: '',
  imgUrl: '',
  lat: 0,
  lng: 0,
  postId: 0,
  subject: '',
};

const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    overlayAction: (state, action: PayloadAction<OverlayState>) => {
      state.postId = action.payload.postId;
      state.title = action.payload.title;
      state.address = action.payload.address;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.imgUrl = action.payload.imgUrl;
      state.subject = action.payload.subject;
    },
  },
});

export default overlaySlice;

export const { overlayAction } = overlaySlice.actions;
