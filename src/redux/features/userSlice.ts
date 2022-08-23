import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLogin: boolean;
  id: number | undefined;
  draw: number | undefined;
  lose: number | undefined;
  nickname: string | undefined;
  profileImgUrl: string | undefined;
  win: number | undefined;
}

const initialState: UserState = {
  isLogin: false,
  id: undefined,
  draw: undefined,
  lose: undefined,
  nickname: undefined,
  profileImgUrl: undefined,
  win: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      console.log(action);
      state.isLogin = true;
      state.id = action.payload.id;
      state.draw = action.payload.draw;
      state.lose = action.payload.lose;
      state.nickname = action.payload.nickname;
      state.profileImgUrl = action.payload.profileImgUrl;
      state.win = action.payload.win;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export default userSlice;

export const { login, logout } = userSlice.actions;
