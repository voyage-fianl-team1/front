import React, { FC } from 'react';

import useUpdateNickName from '../../hooks/auth/useUpdateNickName';

interface Props {
  toggleModal: () => void;
}

const UserNicknameChange: FC<Props> = ({ toggleModal }) => {
  const { value, handler, handleChangeUser } = useUpdateNickName(() => toggleModal());

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
