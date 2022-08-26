import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from '../redux/store';

import New from '../pages/New';
import Search from '../pages/Search';
import Maps from '../pages/Maps';
import Match from '../pages/Match';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Layout from './Layout';
import ChatListPage from '../pages/ChatListPage';
import Keyword from '../pages/keyword';
import ChatDetail from '../pages/ChatDetail';
import Review from '../components/Review';
import { apis } from '../apis';
import { login } from '../redux/features/userSlice';
import { positionAction } from '../redux/features/postionSlice';
import LoadingSpinner from '../components/loadingSpinner';
import MatchHistory from '../pages/MatchHistory';

const Home = React.lazy(() => import('../pages/Home'));

const App = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const userInfo = await apis.getUser().then((res) => res.data);
        const { id, draw, lose, win, nickname, profileImgUrl } = userInfo;
        dispatch(login({ isLogin: true, id, draw, lose, win, nickname, profileImgUrl }));
        console.log('자동로그인 되었습니다');
      } catch (e) {
        console.error('자동로그인 실패');
      }
    };
    autoLogin();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (positions) => {
          dispatch(
            positionAction({ lat: positions.coords.latitude, lng: positions.coords.longitude, isLoading: true })
          );
        },
        (err) => {
          dispatch(positionAction({ lat: 0, lng: 0, isLoading: false }));
        }
      );
    } else {
      dispatch(positionAction({ lat: 0, lng: 0, isLoading: false }));
      alert('현재 위치를 받아올 수 없습니다.');
    }
  }, []);

  if (user.isLogin) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chatList' element={<ChatListPage />} />
            <Route path='/search' element={<Search />} />
            <Route path='/chat/:id' element={<ChatDetail />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/map' element={<Maps />} />
            <Route path='/match/:id' element={<Match />} />
            <Route path='/new' element={<New />} />
            <Route path='/new/:id/edit' element={<New />} />
            <Route path='/keword' element={<Keyword />} />
            <Route path='/review' element={<Review />} />
            <Route path='/matchHistory/:id/subject/:subject' element={<MatchHistory />} />
          </Routes>
        </Layout>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<div>로그인이 필요한 서비스 입니다</div>} />
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
