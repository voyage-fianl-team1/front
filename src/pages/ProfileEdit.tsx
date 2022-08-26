import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface UpdateUser {
  nickname: string;
  deleteImage: string;
  fileList: FileList;
}

const ProfileEdit = () => {
  const { nickname } = useSelector((state: RootState) => state.user);
  return (
    <div className='mt-5'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-xs'>닉네임</h1>
          <h2 className='text-[#38393C]'>{nickname}</h2>
        </div>
        <div>
          <button className='text-[#38393C] text-[12px] border-[1px] rounded py-1 px-2'>수정</button>
        </div>
      </div>
      <div className='flex justify-between items-center mt-8'>
        <div>
          <h1 className='text-xs'>비밀번호</h1>
          <h2 className='text-[#38393C]'>새로운 비밀번호로 변경 가능</h2>
        </div>
        <div>
          <button className='text-[#38393C] text-[12px] border-[1px] rounded py-1 px-2'>수정</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
