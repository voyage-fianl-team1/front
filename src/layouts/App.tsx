import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from '../redux/store';

const Home = React.lazy(() => import('../pages/Home'));
const New = React.lazy(() => import('../pages/New'));
const Search = React.lazy(() => import('../pages/Search'));

const App = () => {
  const user = useSelector((state: RootState) => state.user);

  if (user.isLogin) {
    return <div>로그인 해주세요</div>;
  }

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<div>login</div>} />
        <Route path='/signup' element={<div>signup</div>} />
        <Route path='/search' element={<Search />} />
        <Route path='/chatList' element={<div>chat list</div>} />
        <Route path='/chat/:id' element={<div>chat room</div>} />
        <Route path='/profile' element={<div>profile</div>} />
        <Route path='/map' element={<div>map</div>} />
        <Route path='/match/:id' element={<div>match detail</div>} />
        <Route path='/new' element={<New />} />
        <Route path='/rank/:id' element={<div>개인성적 디테일</div>} />
      </Routes>
    </Suspense>
  );
};

export default App;
