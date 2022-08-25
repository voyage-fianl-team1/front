import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLogin: boolean;
  id: number | undefined;
  draw: number;
  lose: number;
  nickname: string | undefined;
  profileImgUrl: string | undefined;
  win: number;
}

const initialState: UserState = {
  isLogin: false,
  id: undefined,
  draw: 0,
  lose: 0,
  nickname: undefined,
  profileImgUrl: undefined,
  win: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.isLogin = true;
      state.id = action.payload.id;
      state.draw = action.payload.draw;
      state.lose = action.payload.lose;
      state.nickname = action.payload.nickname;
      state.profileImgUrl = action.payload.profileImgUrl;
      state.win = action.payload.win;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export default userSlice;

export const { login, logout } = userSlice.actions;
