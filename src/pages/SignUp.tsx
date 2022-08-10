import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { apis } from '../apis';
import styled from 'styled-components';
import { UserSignUp } from '../typings';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUp>();
  const onSubmit = handleSubmit(async (data: UserSignUp) => {
    try {
      const result = await apis.signUp(data);
      alert(result.data);
      console.log(result);
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(e.response?.data);
      }
    }
  });

  return (
    <div>
      <h1 className='text-3xl font-bold text-center'>회원가입 Page</h1>
      <form className='flex flex-col' onSubmit={onSubmit}>
        <input type='text' placeholder='email' {...register('email', { required: '이메일을 입력해주세요' })} />
        {errors.email && <Error>{errors.email.message}</Error>}
        <input
          type='password'
          placeholder='password'
          {...register('password', { required: '비밀번호를 입력해주세요' })}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <input type='text' placeholder='닉네임' {...register('nickname', { required: '닉네임을 입력해주세요' })} />
        {errors.nickname && <Error>{errors.nickname.message}</Error>}
        <button type='submit'>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;

const Error = styled.div`
  color: red;
`;
