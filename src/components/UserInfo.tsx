import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useForm } from 'react-hook-form';
import { apis } from '../apis';
import { login } from '../redux/features/userSlice';
import { AxiosError } from 'axios';

interface UpdateUser {
  nickname: string;
  deleteImage: string;
  fileList: FileList;
}

const UserInfo = () => {
  const { nickname, profileImgUrl } = useSelector((state: RootState) => state.user);
  const { register, getValues, setValue, watch } = useForm<UpdateUser>();
  const [imagePath, setImagePath] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (nickname) {
      setValue('nickname', nickname);
      setImagePath(profileImgUrl);
    }
  }, [nickname, profileImgUrl]);

  useEffect(() => {
    watch((name) => {
      console.log(name);
      if (name.fileList && name.fileList.length > 0) {
        const selectedFile = name.fileList[0];
        const url = URL.createObjectURL(selectedFile);
        setImagePath(url);
      }
    });
  }, [watch]);

  const handleChangeUser = useCallback(async () => {
    try {
      // 닉네임을 수정하지 않으면 API를 호출하지 않음
      if (nickname !== getValues().nickname) {
        await apis.updateUser(getValues().nickname);
      }

      // 프로필사진을 새로 선택하지 않으면 수정하지 않음
      if (getValues().fileList.length > 0) {
        await apis.updateUserProfileImage(getValues().fileList[0]);
      }

      // 수정하고나서 최신의 유저정보를 가져와서, 재로그인 시키면서, 유저정보 최신화
      const userInfo = await apis.getUser();
      dispatch(login(userInfo.data));
      alert('변경되었습니다');
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(e?.response?.data); // 중복된 닉네임일 경우 알림
      }
      console.error(e);
    }
  }, []);

  return (
    <div className=''>
      <img
        src={imagePath || '/assets/images/avatar.svg'}
        alt='profileImgUrl'
        className='w-[150px] h-[150px] rounded-full object-center m-auto'
      />
      <div className='flex flex-col gap-4'>
        <input type='file' {...register('fileList')} />
        <div className='flex gap-2 items-center'>
          <label htmlFor='nickname'>닉네임</label>
          <input
            id='nickname'
            type='text'
            placeholder='nickname'
            {...register('nickname')}
            className='login-input !mt-0 flex-1'
          />
        </div>
        <button onClick={handleChangeUser} className='login-button'>
          변경하기
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
