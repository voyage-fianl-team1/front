import React, { FC, useCallback } from 'react';
import { useInput } from '../hooks/useInput';
import { apis } from '../apis';
import { login } from '../redux/features/userSlice';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface Props {
  toggleModal: () => void;
}

const UserNicknameChange: FC<Props> = ({ toggleModal }) => {
  const { value, handler } = useInput('');
  const { nickname } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleChangeUser = useCallback(async () => {
    try {
      // 닉네임을 수정하지 않으면 API를 호출하지 않음
      if (value !== nickname) {
        await apis.updateUser(value);
      }

      if (value.length < 2 || value.length > 10) {
        return alert('닉네임은 최소2자 최대 10자 이하여야합니다');
      }

      // 수정하고나서 최신의 유저정보를 가져와서, 재로그인 시키면서, 유저정보 최신화
      const userInfo = await apis.getUser();
      dispatch(login(userInfo.data));
      alert('변경되었습니다');
      toggleModal();
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(e?.response?.data); // 중복된 닉네임일 경우 알림
      }
      console.error(e);
    }
  }, [value]);

  return (
    <div className='px-4 flex justify-center items-center flex-col pt-6 gap-[28px]'>
      <div className='flex  items-center w-[100%]'>
        <input
          id='nickname'
          type='text'
          placeholder='변경할 닉네임을 입력해주세요'
          value={value}
          onChange={handler}
          className='signup-input w-[100%]'
        />
      </div>
      <button className='login-button w-[100%] m-auto' onClick={handleChangeUser}>
        변경하기
      </button>
    </div>
  );
};

export default UserNicknameChange;
