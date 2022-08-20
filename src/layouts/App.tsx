import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from '../redux/store';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Layout from './Layout';
import ChatListPage from '../pages/ChatListPage';

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
          <Route path='/search' element={<div>search</div>} />
          <Route path='/chatList' element={<ChatListPage />} />
          <Route path='/chat/:id' element={<div>chat room</div>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/map' element={<div>map</div>} />
          <Route path='/match/:id' element={<div>match detail</div>} />
          <Route path='/new' element={<div>create match</div>} />
          <Route path='/rank/:id' element={<div>개인성적 디테일</div>} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
