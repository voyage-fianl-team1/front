import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../apis';

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const REACT_APP_SERVER_IP = process.env.REACT_APP_SERVER_IP;

const Splash = () => {
  const handleKakaoLogin = useCallback(() => {
    window.location.href = `${REACT_APP_SERVER_IP}/oauth2/authorization/kakao?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  }, []);

  return (
    <div className='min-h-[90vh]'>
      <div className='flex justify-center items-center flex-1 pt-20'>
        <img src='https://picsum.photos/177/177' alt='logo' className='rounded-full object-cover' />
      </div>
      <div className='absolute bottom-10 left-0 right-0 px-4 flex flex-col gap-4'>
        <Link to='/signup'>
          <button className='flex w-[100%] relative border-[1px] border-[#C5C6CA] py-2 rounded-md bg-white'>
            <img src='/assets/images/signup_pencil.svg' alt='sigup-icon' className='absolute left-2' />
            <span className='flex-1'>회원가입</span>
          </button>
        </Link>
        <button
          className='flex w-[100%] relative border-[1px] border-[#ECD500] py-2 rounded-md bg-[#FAE100]'
          onClick={handleKakaoLogin}
        >
          <img src='/assets/images/kakao-icon.svg' alt='kakao-icon' className='absolute left-2' />
          <span className='flex-1'>카카오톡으로 시작하기</span>
        </button>
        <div className='text-center'>
          <span className='mr-2 text-[#717275]'>이미 가입하셨나요?</span>
          <Link to='/login' className='font-bold underline'>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Splash;
