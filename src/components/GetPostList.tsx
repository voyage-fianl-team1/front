import React, { FC, useRef, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '../apis';
import { useParams } from 'react-router-dom';
import { PostDataProps, JoinDataProps } from '../typings';
import LoadingSpinner from '../components/loadingSpinner';
import { StaticMap } from 'react-kakao-maps-sdk';
import GetJoinData from '../components/GetJoinData';
import Review from '../components/Review';
import ReviewDetail from '../components/ReviewDetail';
import HandleJoinEdit from '../components/HandleJoinEdit';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import CopyToClipboard from 'react-copy-to-clipboard';

const GetPostList = () => {
  const param = useParams();
  const postId = Number(param.id);
  const url = window.location.href;
  const matchRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { data: res, isLoading, refetch } = useQuery(['postList', postId], async () => await apis.getPostList(postId));
  const postData: PostDataProps = res?.data;
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
      content: postData?.content,
    },
  };
  const dday = () => {
    const now = dayjs(new Date());
    const a = dayjs(postData?.matchDeadline);
    const c = now.diff(a, 'day');
    const abs = Math.abs(c);
    if (c < 1 && a.format('YYYY-MM-DD') !== now.format('YYYY-MM-DD')) {
      return <p className='w-[5rem] h-7 text-[#38393C]'>(D-{abs + 1})</p>;
    } else if (c < 1 && a.format('YYYY-MM-DD') === now.format('YYYY-MM-DD')) {
      return <p className='w-[5rem] h-7 text-[#38393C]'>(D-DAY)</p>;
    } else {
      return <></>;
    }
  };

  const changeData = (data: string) => {
    return dayjs(data).format('YYYY.MM.DD.');
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
      <Helmet>
        <title>{`매치기 | ${postId}번째 경기 `}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={`매치기 | ${postId}번째 경기 `} />
        <meta property='og:description' content={postData.content} />
        <meta property='og:image' content={postData.imgurls.pop()} />
      </Helmet>
      <section className='flex flex-col justify-center w-full h-full bg-[#FCFCFC] font-Noto'>
        <div className='w-full h-[124px] pl-[20px] pt-[16px]'>
          <div className='flex mb-[24px] justify-between'>
            <div className='flex flex-row gap-2 items-center'>
              <img
                src={postData.profileImgUrl !== null ? postData.profileImgUrl : '/assets/images/avatar.svg'}
                className='w-[36px] h-[36px] rounded-[100%]'
              />
              <p className='font-SD leading-[17px] tracking-[-0.02rem] text-[#BEBEBE]'>{postData.nickname}</p>
            </div>
            <CopyToClipboard text={url} onCopy={() => alert('링크가 복사되었습니다.')}>
              <button>
                <img src='/assets/images/post/sharebtn.svg'></img>
              </button>
            </CopyToClipboard>
          </div>
          <div
            className={`flex w-full h-[22px] font-medium font-Noto
        leading-[120%] text-[18px] ${postData.matchStatus === 'MATCHEND' ? ' text-[#9A9B9F]' : ' text-[#38393C]'}`}
          >
            {postData.title}
          </div>
          <div ref={matchRef}></div>
        </div>
        <div className='flex flex-row w-full h-[29px] justify-center items-center gap-[25px]'>
          <button className='detail-btn' onClick={handleMoveScroll} autoFocus>
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
        <div
          className='w-full h-[199px] bg-[#F4F5F5] flex flex-col justify-center items-center mb-[28px] border-t-[#EDEDED] border
        border-x-0 border-b-0'
        >
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
              <span className='flex flex-row gap-4'>
                <p className='w-[85px] h-7'>{changeData(postData.matchDeadline)}</p>
                {postData.matchStatus === 'MATCHEND' ? (
                  <p className='w-[3.5rem] h-7 text-[#9A9B9F]'>(마감)</p>
                ) : (
                  <p className='w-[50px]'>{dday()}</p>
                )}
              </span>
            </div>
            <div ref={detailRef}></div>
          </section>
        </div>
        <div className='w-full h-[283px] mb-[28px]'>
          <div className='w-full h-[30px] font-Noto font-medium text-[16px] leading-[120%] text-[#38393C] border border-x-0 border-t-0 border-b-matchgi-bordergray pl-[20px]'>
            경기상세
          </div>
          <div
            className={`flex w-full h-[236px] py-[10px] px-[12px] gap-[10px] items-start font-Noto ${
              postData.matchStatus === 'MATCHEND' ? 'text-[#9A9B9F]' : 'text-[#38393C]'
            }`}
            ref={locationRef}
          >
            <pre className='w-full whitespace-pre-wrap'>{postData.content}</pre>
          </div>
        </div>
        <section className='w-full h-[289px] mb-[36px]'>
          <div className='w-full h-[30px] font-Noto font-medium text-[16px] leading-[120%] text-[#38393C] border border-x-0 border-t-0 border-b-matchgi-bordergray pl-[20px]'>
            경기장소
          </div>
          <div className='flex flex-col w-full h-[270px] items-center p-5'>
            <p
              className={`w-full h-[17px] font-Noto text-[14px] font-medium leading-[120%] mb-[25px] mt-[10px] ${
                postData.matchStatus === 'MATCHEND' ? 'text-[#9A9B9F]' : 'text-[#38393C]'
              }`}
            >
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

export default GetPostList;
