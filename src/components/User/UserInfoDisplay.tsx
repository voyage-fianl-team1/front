import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdChangeCircle } from 'react-icons/md';
import useCurrentUser from '../../hooks/auth/useCurrentUser';
import useUpdateProfileImage from '../../hooks/auth/useUpdateProfileImage';
import useLogin from '../../hooks/auth/useLogin';

const UserInfoDisplay = () => {
  const {
    user: { nickname, profileImgUrl, win, lose, draw, id },
  } = useCurrentUser();

  const { fetchUserInfo } = useLogin();
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const { handleUpdateUserImage } = useUpdateProfileImage();
  const imageRef = useRef<HTMLInputElement>(null);
  const handleClickImage = () => {
    if (!imageRef.current) return;
    imageRef.current.click();
  };

  return (
    <div className='flex items-center justify-start w-[100%] gap-3 mt-3'>
      <div className='w-[72px] h-[72px]'>
        <input type='file' className='hidden' ref={imageRef} onChange={handleUpdateUserImage} />
        <MdChangeCircle
          className='absolute top-1 left-[65px] cursor-pointer hover:rotate-90 transition-all duration-300'
          size={28}
          onClick={handleClickImage}
        />
        <img
          src={profileImgUrl || '/assets/images/avatar.svg'}
          alt='profileImgUrl'
          className='w-[100%] h-[100%] rounded-full'
        />
      </div>
      <div>
        <h1 className='mb-1 font-[500] max-w-[250px]'>{nickname}</h1>
        <ul className='flex items-center gap-2'>
          <li>
            경기 <span className='font-semibold'>{win + lose + draw}</span>
          </li>
          <li className='w-[1px] bg-[#C5C6CA] h-[13px] inline-block' />
          <li>
            승 <span className='font-semibold'>{win}</span>
          </li>
          <li className='w-[1px] bg-[#C5C6CA] h-[13px] inline-block' />
          <li>
            패 <span className='font-semibold'>{lose}</span>
          </li>
          <li className='ml-4'>
            <Link to={`/matchHistory/${id}/subject/ALL?nickname=${nickname}`}>
              <img src='/assets/images/menu/arrow.svg' alt='arrow' />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfoDisplay;
