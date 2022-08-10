import React from 'react';
import { useForm } from 'react-hook-form';
import { apis } from '../apis';
import styled from 'styled-components';
import { UserLogin } from '../typings';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();
  const onSubmit = handleSubmit(async (data: UserLogin) => {
    try {
      const result = await apis.signIn(data);
      const accessToken = result.data.accessToken.split(' ')[1];
      const refreshToken = result.data.refreshToken.split(' ')[1];
      window.localStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('refreshToken', refreshToken);
      alert('로그인 성공');
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(e.response?.data);
      }
    }
  });

  return (
    <div className='m-2'>
      <h1 className='text-3xl font-bold text-center'>로그인 Page</h1>
      <form className='flex flex-col' onSubmit={onSubmit}>
        <input type='text' placeholder='email' {...register('email', { required: '이메일을 입력해주세요' })} />
        {errors.email && <Error>{errors.email.message}</Error>}
        <input
          type='password'
          placeholder='password'
          {...register('password', { required: '비밀번호를 입력해주세요' })}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <button type='submit'>로그인</button>
      </form>
    </div>
  );
};

export default Login;

const Error = styled.div`
  color: red;
`;
