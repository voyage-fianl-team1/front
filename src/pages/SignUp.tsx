import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apis } from '../apis';
import styled from 'styled-components';
import { UserSignUp } from '../typings';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SignUp = () => {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    setValue,
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
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordCheckShow, setPasswordCheckShow] = useState(false);

  const togglePsswordShow = useCallback(() => {
    setPasswordShow((prev) => !prev);
  }, []);

  const togglePsswordCheckShow = useCallback(() => {
    setPasswordCheckShow((prev) => !prev);
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'passwordCheck' || name === 'password') {
        if (value.password !== value.passwordCheck) {
          setError('passwordCheck', { message: '동일하지 않은 비밀번호 입니다' });
        } else {
          setError('passwordCheck', { message: '' });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <Helmet>
        <title>매치기 | 회원가입</title>
      </Helmet>
      <div>
        <form className='flex flex-col' onSubmit={onSubmit}>
          <p className='text-sm mb-2 mt-10'>아이디</p>
          <div className='w-full relative'>
            <input
              className='signup-input'
              type='text'
              placeholder='email'
              {...register('email', { required: '이메일을 입력해주세요' })}
            />
            <img
              src='/assets/images/input/input-remove.svg'
              alt='remove-input'
              className='absolute right-3 top-3.5 '
              onClick={() => setValue('email', '')}
            />
          </div>
          {errors.email && <Error>{errors.email.message}</Error>}
          <p className='text-sm mb-2 mt-10'>닉네임</p>
          <div className='w-full relative'>
            <input
              className='signup-input'
              type='text'
              placeholder='닉네임'
              {...register('nickname', { required: '닉네임을 입력해주세요' })}
            />
            <img
              src='/assets/images/input/input-remove.svg'
              alt='remove-input'
              className='absolute right-3 top-3.5 '
              onClick={() => setValue('nickname', '')}
            />
          </div>
          {errors.nickname && <Error>{errors.nickname.message}</Error>}
          <p className='text-sm mb-2 mt-10'>비밀번호</p>
          <div className='w-full relative'>
            <input
              className='signup-input'
              type={passwordShow ? 'text' : 'password'}
              placeholder='password'
              {...register('password', { required: '비밀번호를 입력해주세요' })}
            />
            <img
              src={passwordShow ? '/assets/images/input/pw-show.svg' : '/assets/images/input/pw-block.svg'}
              alt='remove-input'
              className='absolute right-3 top-3 '
              onClick={togglePsswordShow}
            />
          </div>
          {errors.password && <Error>{errors.password.message}</Error>}
          <p className='text-sm mb-2 mt-10'>비밀번호 확인</p>
          <div className='w-full relative'>
            <input
              className='signup-input'
              type={passwordCheckShow ? 'text' : 'password'}
              placeholder='비밀번호 확인'
              {...register('passwordCheck', { required: '비밀번호 확인해주세요' })}
            />
            <img
              src={passwordCheckShow ? '/assets/images/input/pw-show.svg' : '/assets/images/input/pw-block.svg'}
              alt='remove-input'
              className='absolute right-3 top-3 '
              onClick={togglePsswordCheckShow}
            />
          </div>
          {errors.passwordCheck && <Error>{errors.passwordCheck.message}</Error>}
          <div className='max-w-[1000px] m-auto w-[100%] mt-10'>
            <button className='login-button w-[100%]' type='submit'>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;

const Error = styled.div`
  color: red;
  font-size: 12px;
  padding-left: 8px;
  margin-top: 5px;
`;
