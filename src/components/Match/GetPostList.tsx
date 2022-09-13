import React from 'react';
import { StaticMap } from 'react-kakao-maps-sdk';
import { Helmet } from 'react-helmet';
import { useScroll } from '../../hooks/match/useScroll';
import { useUtil } from '../../hooks/post/useUtil';
import { changeDataFormat } from '../../util/converDate';
import { useGetPostList } from '../../hooks/queries/useGetPostList';
import CopyToClipboard from 'react-copy-to-clipboard';
import LoadingSpinner from '../Common/loadingSpinner';
import GetJoinData from './GetJoinData';
import Dday from './Dday';
import Review from '../Review/Review';
import ReviewDetail from '../Review/ReviewDetail';
import HandleJoinEdit from './HandleJoinEdit';

const GetPostList = () => {
  const { matchRef, detailRef, locationRef, reviewRef, handleMoveScroll } = useScroll('');
  const { postId, url } = useUtil('');
  const { postData, isLoading, drill } = useGetPostList(postId);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Helmet>
        <title>{`매치기 | ${postId}번째 경기 `}</title>
        <meta name='description' content={postData.content} data-react-helmet='true' />
        <meta name='keywords' content={postData.title} data-react-helmet='true' />
        <meta property='og:type' content='website' data-react-helmet='true' />
        <meta property='og:site_name' content={postData.title} data-react-helmet='true' />
        <meta property='og:url' content={`https://match-gi.com/match/${postId}`} data-react-helmet='true' />
        <meta property='og:title' content={postData.title} data-react-helmet='true' />
        <meta property='og:description' content={postData.content} data-react-helmet='true' />
        <meta
          property='og:image'
          content={postData.imgurls.pop() === '' || null ? '/logo512.png' : postData.imgurls.pop()}
          data-react-helmet='true'
        />
        <link rel='canonical' href={`https://match-gi.com/match/${postId}`} />
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
        <div className='flex flex-row w-full h-[29px] justify-center items-center gap-[25px] font-Noto'>
          <button className='detail-btn' onClick={handleMoveScroll} autoFocus value='1'>
            경기정보
          </button>
          <button className='detail-btn' onClick={handleMoveScroll} value='2'>
            경기상세
          </button>
          <button className='detail-btn' onClick={handleMoveScroll} value='3'>
            경기장소
          </button>
          <button className='detail-btn' onClick={handleMoveScroll} value='4'>
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
              <p className='w-full h-7 font-Noto'>{postData.subject}</p>
              <span className='flex flex-row gap-4'>
                <p className='w-[85px] h-7 font-SD'>{changeDataFormat(postData.matchDeadline)}</p>
                {postData.matchStatus === 'MATCHEND' ? (
                  <p className='w-[3.5rem] h-7 text-[#9A9B9F] font-Noto'>(마감)</p>
                ) : (
                  <Dday {...drill} />
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
            <pre className='w-full whitespace-pre-wrap font-Noto'>{postData.content}</pre>
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
