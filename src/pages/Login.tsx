import React from 'react';
import { useForm } from 'react-hook-form';
import { apis } from '../apis';
import styled from 'styled-components';
import { UserLogin } from '../typings';
import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/userSlice';
import { Helmet } from 'react-helmet';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();
  const onSubmit = handleSubmit(async (data: UserLogin) => {
    try {
      const result = await apis.signIn(data);
      const accessToken = result.data.accessToken.split(' ')[1];
      const refreshToken = result.data.refreshToken;
      window.localStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('refreshToken', refreshToken);
      const userInfo = await apis.getUser().then((res) => res.data);
      const { id, draw, lose, win, nickname, profileImgUrl } = userInfo;
      dispatch(login({ isLogin: true, id, draw, lose, win, nickname, profileImgUrl }));
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(e.response?.data);
      }
    }
  });

  return (
    <>
      <Helmet>
        <title>매치기 | 로그인</title>
      </Helmet>
      <div className='m-2'>
        <div className='absolute left-0 right-0 h-[1px] bg-[#DCDDE0] top-0'></div>
        <form className='flex flex-col mt-10' onSubmit={onSubmit}>
          <input
            className='login-input'
            type='text'
            placeholder='아이디를 입력하세요'
            {...register('email', { required: '이메일을 입력해주세요' })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
          <input
            className='login-input'
            type='password'
            placeholder='비밀번호를 입력하세요'
            {...register('password', { required: '비밀번호를 입력해주세요' })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          <div className='fixed bottom-20 left-0 right-0 px-5 max-w-[1000px] m-auto'>
            <button type='submit' className='login-button w-[100%] '>
              로그인
            </button>
            <Link to='/signup'>
              <p className='text-center underline text-matchgi-gray mt-10'>아직 회원이 아니신가요?</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

const Error = styled.div`
  color: red;
  font-size: 12px;
  padding-left: 8px;
  margin-top: 5px;
`;
