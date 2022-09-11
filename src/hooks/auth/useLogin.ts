import { UserLogin } from '../../typings';
import { apis } from '../../apis';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { login } from '../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setItemToLS } from '../../util/handleLocalStorage';

function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  const handleLogin = async (data: UserLogin) => {
    try {
      const result = await apis.signIn(data);
      const accessToken = result.data.accessToken.split(' ')[1];
      const refreshToken = result.data.refreshToken;
      setTokens(accessToken, refreshToken);

      await fetchUserInfo();
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(e.response?.data);
      }
    }
  };

  const onSubmit = handleSubmit(handleLogin);

  const fetchUserInfo = useCallback(async () => {
    try {
      const userInfo = await apis.getUser().then((res) => res.data);
      const { id, draw, lose, win, nickname, profileImgUrl } = userInfo;
      dispatch(login({ isLogin: true, id, draw, lose, win, nickname, profileImgUrl }));
      return { msg: '유저 정보를 불러오고 로그인 되었습니다', res: true };
    } catch (e) {
      return { msg: '유저정보를 불러오는데 실패하였습니다', res: false };
    }
  }, []);

  const setTokens = useCallback((accessToken: string, refreshToken: string) => {
    setItemToLS('accessToken', accessToken);
    setItemToLS('refreshToken', refreshToken);
  }, []);

  return { fetchUserInfo, register, errors, onSubmit, setTokens };
}

export default useLogin;
