import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Helmet } from 'react-helmet';
import UserNicknameChange from '../components/UserNIcknameChange';

interface UpdateUser {
  nickname: string;
  deleteImage: string;
  fileList: FileList;
}

const ProfileEdit = () => {
  const { nickname } = useSelector((state: RootState) => state.user);
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
            <h1 className='text-xs'>닉네임</h1>
            <h2 className='text-[#38393C] max-w-[250px]'>{nickname}</h2>
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
        <div className='flex justify-between items-center mt-8'>
          <div>
            <h1 className='text-xs'>비밀번호</h1>
            <h2 className='text-[#38393C]'>새로운 비밀번호로 변경 가능</h2>
          </div>
          <div>
            <button
              className='text-[#38393C] text-[12px] border-[1px] rounded py-1 px-2'
              onClick={() => toggleModal('password')}
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
