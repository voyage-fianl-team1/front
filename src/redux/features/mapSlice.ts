import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface mapState {
  sw: string;
  ne: string;
}

const initialState: mapState = {
  sw: '',
  ne: '',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    mapAction: (state, action: PayloadAction<mapState>) => {
      state.sw = action.payload.sw;
      state.ne = action.payload.ne;
    },
    mapClear: () => initialState,
  },
});

export default mapSlice;

export const { mapAction, mapClear } = mapSlice.actions;
