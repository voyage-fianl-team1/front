import { useInput } from '../util/useInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useCallback } from 'react';
import { apis } from '../../apis';
import { AxiosError } from 'axios';
import useLogin from './useLogin';

function useUpdateNickName(callback: () => void) {
  const { value, handler } = useInput('');
  const { nickname } = useSelector((state: RootState) => state.user);
  const { fetchUserInfo } = useLogin();

  const handleChangeUser = useCallback(async () => {
    try {
      // 닉네임을 수정하지 않으면 API를 호출하지 않음
      if (value !== nickname) {
        await apis.updateUser(value);
      }

      if (value.length < 2 || value.length > 10) {
        return alert('닉네임은 최소2자 최대 10자 이하여야합니다');
      }

      await fetchUserInfo();
      callback && callback();
      alert('변경되었습니다');
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(e?.response?.data); // 중복된 닉네임일 경우 알림
      }
      console.error(e);
    }
  }, [value]);

  return {
    value,
    handler,
    handleChangeUser,
  };
}

export default useUpdateNickName;
