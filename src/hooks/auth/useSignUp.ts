import { useForm } from 'react-hook-form';
import { UserSignUp } from '../../typings';
import { useNavigate } from 'react-router-dom';
import { apis } from '../../apis';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';

function useSignUp() {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<UserSignUp>();
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordCheckShow, setPasswordCheckShow] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onSubmit = handleSubmit(async (data: UserSignUp) => {
    if (!isValidate.status) {
      return alert(isValidate.message);
    }
    try {
      const result = await apis.signUp(data);
      alert(result.data);
      navigate('/login');
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(e.response?.data);
      }
    }
  });

  const isValidate = useMemo(() => {
    if (passwordError) {
      return {
        status: false,
        message: '비밀번호를 확인해주세요',
      };
    }

    return {
      status: true,
      message: '',
    };
  }, [passwordError]);

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
          setPasswordError(true);
        } else {
          setError('passwordCheck', { message: '' });
          setPasswordError(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return {
    register,
    setValue,
    onSubmit,
    errors,
    passwordShow,
    passwordCheckShow,
    togglePsswordShow,
    togglePsswordCheckShow,
  };
}

export default useSignUp;
