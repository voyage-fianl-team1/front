import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isLogin: boolean;
}

const initialState: UserState = {
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export default userSlice;
