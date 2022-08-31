import React, { FC, useRef, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '../apis';
import { useParams, Link } from 'react-router-dom';
import { PostDataProps } from '../typings';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/loadingSpinner';
import { useDispatch } from 'react-redux';
import { addressAction } from '../redux/features/addressSlice';
import { subjectAction } from '../redux/features/subjectSlice';
import { calendarAction } from '../redux/features/calendarSlice';
import { StaticMap } from 'react-kakao-maps-sdk';
import GetJoinData from '../components/GetJoinData';
import dayjs from 'dayjs';
import { JoinDataProps } from '../typings';
import Review from '../components/Review';
import ReviewDetail from '../components/ReviewDetail';
import HandleJoinEdit from '../components/HandleJoinEdit';

const Match: FC = () => {
  const param = useParams();
  const postId = Number(param.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matchRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { data: res, isLoading, refetch } = useQuery(['postList', postId], async () => await apis.getPostList(postId));
  const postData: PostDataProps = res?.data;
  const date = new Date();
  const nowDate = dayjs(date).format('YYYY-MM-DD');
  const drill: JoinDataProps = {
    data: {
      owner: postData?.owner,
      postId: postId,
      player: postData?.player,
      matchStatus: postData?.matchStatus,
      profileUrl: postData?.profileImgUrl,
      nickName: postData?.nickname,
      matchDeadline: postData?.matchDeadline,
      lat: postData?.lat,
      lng: postData?.lng,
      address: postData?.address,
      imgpaths: postData?.imgpaths,
      imgurls: postData?.imgurls,
      subjectValue: postData?.subjectValue,
      subject: postData?.subject,
      title: postData?.title,
    },
  };

  const handleMoveScroll = () => {
    matchRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleMoveScroll2 = () => {
    detailRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleMoveScroll3 = () => {
    locationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleMoveScroll4 = () => {
    reviewRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    refetch();
    queryClient.invalidateQueries(['postData']);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <section className='flex flex-col justify-center w-full h-full bg-[#FCFCFC]'>
        <div className='w-full h-[124px] pl-[20px] pt-[16px]'>
          <div className='flex flex-row gap-2 items-center mb-[24px]'>
            <img
              src={
                postData.profileImgUrl !== null
                  ? postData.profileImgUrl
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              className='w-[36px] h-[36px] rounded-[100%]'
            />
            <p className='font-SD leading-[17px] tracking-[-0.02rem] text-[#BEBEBE]'>{postData.nickname}</p>
          </div>
          <div
            className='flex w-full h-[22px] font-medium font-Noto
        leading-[120%] text-[18px text-[#38393C]'
          >
            {postData.title}
          </div>
          <div ref={matchRef}></div>
        </div>
        <div className='flex flex-row w-full h-[29px] justify-center items-center gap-[40px]'>
          <button className='detail-btn' onClick={handleMoveScroll}>
            경기정보
          </button>
          <button className='detail-btn' onClick={handleMoveScroll2}>
            경기상세
          </button>
          <button className='detail-btn' onClick={handleMoveScroll3}>
            경기장소
          </button>
          <button className='detail-btn' onClick={handleMoveScroll4}>
            댓글
          </button>
        </div>
        <div className='w-full h-[199px] bg-[#F4F5F5] flex flex-col justify-center items-center mb-[28px]'>
          <div className='w-full font-Noto leading-[120%] text-[#000] mb-[13px] font-medium text-[16px] pl-[20px]'>
            경기정보
          </div>
          <section className='flex flex-row w-11/12 h-[109px] bg-[#FFFFFF] rounded-[16px] justify-left items-center gap-5 font-Noto'>
            <div className='font-medium tracking-[-0.02rem] leading-[150%] text-[#9A9B9F] ml-[25px]'>
              <p className='w-full h-7'>경기종목</p>
              <p className='w-full h-7'>모집마감일</p>
            </div>

            <div>
              <p className='w-full h-7'>{postData.subject}</p>
              <p className='w-full h-7'>{postData.matchDeadline}</p>
            </div>
            <div ref={detailRef}></div>
          </section>
        </div>
        <div className='w-full h-[283px] mb-[28px]'>
          <div className='w-full h-[30px] font-Noto font-medium text-[16px] leading-[120%] text-[#38393C] border border-x-0 border-t-0 border-b-matchgi-bordergray pl-[20px]'>
            경기상세
          </div>
          <div className='flex w-full h-[236px] py-[10px] px-[12px] gap-[10px] items-start' ref={locationRef}>
            {postData.content}
          </div>
        </div>
        <section className='w-full h-[289px] mb-[60px]'>
          <div className='w-full h-[30px] font-Noto font-medium text-[16px] leading-[120%] text-[#38393C] border border-x-0 border-t-0 border-b-matchgi-bordergray pl-[20px]'>
            경기장소
          </div>
          <div className='flex flex-col w-full h-[270px] items-center p-5'>
            <p className='w-full h-[17px] font-Noto text-[14px] font-medium leading-[120%] mb-[25px] mt-[10px] ml-[25px]'>
              {postData.address}
            </p>
            <StaticMap
              center={{
                lat: postData.lat,
                lng: postData.lng,
              }}
              className='w-full h-full rounded-[20px]'
              marker={{
                position: {
                  lat: postData.lat,
                  lng: postData.lng,
                },
              }}
              level={3}
            />
          </div>
        </section>
        <div ref={reviewRef} />
        <HandleJoinEdit {...drill} />
      </section>
      <ReviewDetail {...drill} />
      <Review {...drill} />
      <GetJoinData {...drill} />
    </>
  );
};

export default Match;
