import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { apis } from '../apis';
import styled from 'styled-components';
import { UserSignUp } from '../typings';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserSignUp>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data: UserSignUp) => {
    try {
      const result = await apis.signUp(data);
      alert(result.data);
      console.log(result);
      navigate('/login');
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(e.response?.data);
      }
    }
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'passwordCheck' || name === 'password') {
        if (value.password !== value.passwordCheck) {
          setError('passwordCheck', { message: '비밀번호가 일치하지 않습니다' });
        } else {
          setError('passwordCheck', { message: '' });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div>
      <form className='flex flex-col' onSubmit={onSubmit}>
        <p className='text-sm mb-2 mt-10'>아이디</p>
        <input
          className='signup-input'
          type='text'
          placeholder='email'
          {...register('email', { required: '이메일을 입력해주세요' })}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        <p className='text-sm mb-2 mt-10'>닉네임</p>
        <input
          className='signup-input'
          type='text'
          placeholder='닉네임'
          {...register('nickname', { required: '닉네임을 입력해주세요' })}
        />
        {errors.nickname && <Error>{errors.nickname.message}</Error>}
        <p className='text-sm mb-2 mt-10'>비밀번호</p>
        <input
          className='signup-input'
          type='password'
          placeholder='password'
          {...register('password', { required: '비밀번호를 입력해주세요' })}
        />
        {errors.password && <Error>{errors.password.message}</Error>}

        <p className='text-sm mb-2 mt-10'>비밀번호 확인</p>
        <input
          className='signup-input'
          type='password'
          placeholder='비밀번호 확인'
          {...register('passwordCheck', { required: '비밀번호 확인해주세요' })}
        />
        {errors.passwordCheck && <Error>{errors.passwordCheck.message}</Error>}
        <div className='max-w-[1000px] m-auto w-[100%] mt-10'>
          <button className='login-button w-[100%]' type='submit'>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

const Error = styled.div`
  color: red;
  font-size: 12px;
  padding-left: 8px;
  margin-top: 5px;
`;
