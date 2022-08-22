import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { apis, instance } from '../apis';
import { Link } from 'react-router-dom';

interface UpdateUser {
  nickname: string;
  deleteImage: string;
  fileList: FileList;
}

const Profile = () => {
  const { register, getValues } = useForm<UpdateUser>();

  const handleChangeUser = useCallback(async () => {
    const body = {
      nickname: getValues().nickname,
      file: getValues().fileList[0],
    };
    const result = await apis.updateUser(body);
    console.log(result);
  }, []);

  instance.get('api/users').then(console.log);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold'>Profile page</h1>
      <input type='text' placeholder='nickname' {...register('nickname')} />
      <input type='file' {...register('fileList')} />
      <button onClick={handleChangeUser}>닉네임 변경하기</button>
    </div>
  );
};

export default Profile;
