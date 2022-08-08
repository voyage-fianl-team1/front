import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function App() {
  const user = useSelector((state: RootState) => state.user);

  if (!user.isLogin) {
    return <div>로그인 해주세요</div>;
  }

  return (
    <div className='App'>
      <h1 className='text-red-500'>TITLE</h1>
    </div>
  );
}

export default App;
