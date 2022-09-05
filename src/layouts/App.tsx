import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from '../redux/store';
import Layout from './Layout';
import { apis } from '../apis';
import { login } from '../redux/features/userSlice';
import { positionAction } from '../redux/features/postionSlice';
import LoadingSpinner from '../components/loadingSpinner';

const Home = React.lazy(() => import('../pages/Home'));
const Splash = React.lazy(() => import('../pages/Splash'));
const Login = React.lazy(() => import('../pages/Login'));
const SignUp = React.lazy(() => import('../pages/SignUp'));
const RedirectKakao = React.lazy(() => import('../pages/RedirectKakao'));
const FailKakao = React.lazy(() => import('../pages/FailKakao'));
const ChatListPage = React.lazy(() => import('../pages/ChatListPage'));
const Search = React.lazy(() => import('../pages/Search'));
const ChatDetail = React.lazy(() => import('../pages/ChatDetail'));
const Profile = React.lazy(() => import('../pages/Profile'));
const UserMatchMore = React.lazy(() => import('../pages/UserMatchMore'));
const ProfileEdit = React.lazy(() => import('../pages/ProfileEdit'));
const Maps = React.lazy(() => import('../pages/Maps'));
const Match = React.lazy(() => import('../pages/Match'));
const New = React.lazy(() => import('../pages/New'));
const Keyword = React.lazy(() => import('../pages/keyword'));
const MatchHistory = React.lazy(() => import('../pages/MatchHistory'));
const Searching = React.lazy(() => import('../pages/Searching'));

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
          dispatch(positionAction({ lat: 37.56076156591573, lng: 126.98573914405821, isLoading: false }));
        }
      );
    }
    // else {
    //   dispatch(positionAction({ lat: 37.33116, lng: 126.58111, isLoading: false }));
    //   alert('현재 위치를 받아올 수 없습니다.');
    // }
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
            <Route path='/profile/userMatchMore' element={<UserMatchMore />} />
            <Route path='/profile/edit' element={<ProfileEdit />} />
            <Route path='/map' element={<Maps />} />
            <Route path='/match/:id' element={<Match />} />
            <Route path='/new' element={<New />} />
            <Route path='/new/:id/edit' element={<New />} />
            <Route path='/keword' element={<Keyword />} />
            <Route path='/searching' element={<Searching />} />
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
          <Route path='/splash' element={<Splash />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          {/* <Route path='/match/:id' element={<Match />} /> */}
          <Route path='/redirectKakao' element={<RedirectKakao />} />
          <Route path='/failKakao' element={<FailKakao />} />
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
