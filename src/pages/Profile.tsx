import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { apis } from '../apis';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface UpdateUser {
  nickname: string;
  deleteImage: string;
  fileList: FileList;
}

const Profile = () => {
  const { nickname, profileImgUrl } = useSelector((state: RootState) => state.user);
  const { register, getValues, setValue } = useForm<UpdateUser>();

  useEffect(() => {
    if (nickname) {
      setValue('nickname', nickname);
    }
  }, [nickname, profileImgUrl]);

  const handleChangeUser = useCallback(async () => {
    try {
      const nicknameResult = await apis.updateUser(getValues().nickname);
      const profileImageResult = await apis.updateUserProfileImage(getValues().fileList[0]);
      console.log(nicknameResult);
      console.log(profileImageResult);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold'>Profile page</h1>
      <img src={profileImgUrl || '/assets/images/avatar.svg'} alt='profileImgUrl' />
      <input type='text' placeholder='nickname' {...register('nickname')} />
      <input type='file' {...register('fileList')} />
      <button onClick={handleChangeUser}>변경하기</button>
    </div>
  );
};

export default Profile;
