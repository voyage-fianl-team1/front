import React, { ChangeEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import { apis } from '../apis';
import { login } from '../redux/features/userSlice';
import { MdChangeCircle } from 'react-icons/md';

const UserInfoDisplay = () => {
  const { nickname, profileImgUrl, win, lose, draw, id } = useSelector((state: RootState) => state.user);
  const imageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleClickImage = () => {
    if (!imageRef.current) return;
    imageRef.current.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    try {
      const result = await apis.updateUserProfileImage(e.target.files[0]);
      const userInfo = await apis.getUser();
      dispatch(login(userInfo.data));
    } catch (e) {
      console.error(e);
      alert('프로필 사진 변경중 에러가 발생하였습니다');
    }
  };

  return (
    <div className='flex items-center justify-start w-[100%] gap-3'>
      <div className='w-[72px] h-[72px]'>
        <input type='file' className='hidden' ref={imageRef} onChange={handleChange} />
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
        <h1 className='mb-1 font-[500]'>{nickname}</h1>
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
            <Link to={`/matchHistory/${id}/subject/ALL`}>
              <img src='/assets/images/menu/arrow.svg' alt='arrow' />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfoDisplay;
