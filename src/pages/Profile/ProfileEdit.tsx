import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import UserNicknameChange from '../../components/User/UserNIcknameChange';
import useCurrentUser from '../../hooks/auth/useCurrentUser';

const ProfileEdit = () => {
  const {
    user: { nickname },
  } = useCurrentUser();
  const [modalShow, setModalShow] = useState(false);
  const [selected, setSelected] = useState('');
  const toggleModal = useCallback((target?: string) => {
    if (target) {
      setSelected(target);
    }
    setModalShow((prev) => !prev);
  }, []);

  return (
    <>
      <Helmet>
        <title>매치기 | 프로필 수정</title>
      </Helmet>
      <div className='mt-5'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-[14px]'>닉네임</h1>
            <h2 data-testid='nickname' className='text-[#38393C] max-w-[250px]'>
              {nickname}
            </h2>
          </div>
          <div>
            <button
              className='text-[#38393C] text-[12px] border-[1px] rounded py-1 px-2'
              onClick={() => toggleModal('nickname')}
            >
              수정
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed left-0 right-0 bg-white rounded-t-2xl h-[300px] transition-all ${
          modalShow ? 'bottom-0' : 'bottom-[-300px]'
        }`}
      >
        {selected === 'nickname' ? (
          <UserNicknameChange toggleModal={toggleModal} />
        ) : (
          <div className='text-center'>준비중입니다</div>
        )}
      </div>
    </>
  );
};

export default ProfileEdit;
