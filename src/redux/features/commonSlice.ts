import { createSlice } from '@reduxjs/toolkit';

interface CommonState {
  sideMenuShow: boolean;
}

const initialState: CommonState = {
  sideMenuShow: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleSideMenuShow: (state) => {
      state.sideMenuShow = !state.sideMenuShow;
    },
    closeSideMenu: (state) => {
      state.sideMenuShow = false;
    },
    openSideMenu: (state) => {
      state.sideMenuShow = true;
    },
  },
});

export default commonSlice;

export const { toggleSideMenuShow, closeSideMenu, openSideMenu } = commonSlice.actions;
