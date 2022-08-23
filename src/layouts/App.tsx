import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
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
import Keyword from '../pages/keyword';

const Home = React.lazy(() => import('../pages/Home'));

const App = () => {
  const user = useSelector((state: RootState) => state.user);

  if (user.isLogin) {
    return <div>로그인 해주세요</div>;
  }

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/chatList' element={<ChatListPage />} />
          <Route path='/search' element={<Search />} />
          <Route path='/chat/:id' element={<div>chat room</div>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/map' element={<Map />} />
          <Route path='/match/:id' element={<Match />} />
          <Route path='/new' element={<New />} />
          <Route path='/keword' element={<Keyword />} />
          <Route path='/rank/:id' element={<div>개인성적 디테일</div>} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
