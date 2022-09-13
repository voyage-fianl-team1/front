import { ChangeEvent } from 'react';
import { apis } from '../../apis';
import useLogin from './useLogin';

function useUpdateProfileImage() {
  const { fetchUserInfo } = useLogin();

  const handleUpdateUserImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    try {
      await apis.updateUserProfileImage(e.target.files[0]);
      await fetchUserInfo();
    } catch (e) {
      console.error(e);
      alert('프로필 사진 변경중 에러가 발생하였습니다');
    }
  };
  return { handleUpdateUserImage };
}

export default useUpdateProfileImage;
