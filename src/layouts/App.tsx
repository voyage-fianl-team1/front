import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from '../redux/store';

import New from '../pages/New';
import Search from '../pages/Search';
import Map from '../pages/Map';
import Match from '../pages/Match';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Layout from './Layout';
import ChatListPage from '../pages/ChatListPage';
import ChatDetail from '../pages/ChatDetail';
import { apis } from '../apis';
import { login } from '../redux/features/userSlice';

const Home = React.lazy(() => import('../pages/Home'));

const App = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLogin = async () => {
      const userInfo = await apis.getUser().then((res) => res.data);
      const { id, draw, lose, win, nickname, profileImgUrl } = userInfo;
      dispatch(login({ isLogin: true, id, draw, lose, win, nickname, profileImgUrl }));
    };
    autoLogin();
  }, []);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/chatList' element={<ChatListPage />} />
          <Route path='/search' element={<Search />} />
          <Route path='/chat/:id' element={<ChatDetail />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/map' element={<Map />} />
          <Route path='/match/:id' element={<Match />} />
          <Route path='/new' element={<New />} />
          <Route path='/rank/:id' element={<div>개인성적 디테일</div>} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;

/**
 * 백엔드 -> 쿼리시간 단축
 * 피드백 바탕으로 무슨피드백? 받았는지 정리
 *
 * 프론트 -> 반응형, 적응형 UI
 */
