import React from 'react';
import { Link } from 'react-router-dom';
import useKakoAuth from '../../hooks/auth/useKakoAuth';

const Splash = () => {
  const { handleKakaoLogin } = useKakoAuth();

  return (
    <div className='min-h-[90vh]'>
      <div className='flex justify-center items-center flex-1 pt-20'>
        <img src='/assets/images/logo.svg' alt='logo' className='object-cover' />
      </div>
      <div className='absolute bottom-10 left-0 right-0 px-4 flex flex-col gap-4'>
        <Link to='/signup'>
          <button
            data-testid='signup-button'
            className='flex w-[100%] relative border-[1px] border-[#C5C6CA] py-2 rounded-md bg-white'
          >
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
          <span className='login-link'>
            <Link to='/login' className='font-bold underline'>
              로그인
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Splash;
