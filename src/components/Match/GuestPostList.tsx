import React from 'react';
import { StaticMap } from 'react-kakao-maps-sdk';
import { Helmet } from 'react-helmet';
import { useScroll } from '../../hooks/match/useScroll';
import { changeDataFormat } from '../../util/converDate';
import { useUtil } from '../../hooks/post/useUtil';
import { useGetPostList } from '../../hooks/queries/useGuestPostList';
import usePush from '../../hooks/usePush';
import CopyToClipboard from 'react-copy-to-clipboard';
import GetJoinData from './GetJoinData';
import ReviewDetail from '../Review/ReviewDetail';
import Dday from './Dday';
import LoadingSpinner from '../Common/loadingSpinner';

const GuestPostList = () => {
  const { matchRef, detailRef, locationRef, reviewRef, handleMoveScroll } = useScroll('');
  const { postId, url } = useUtil('');
  const { push } = usePush();
  const { guestData, isLoading, drill } = useGetPostList(postId);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Helmet>
        <title>{`매치기 | ${postId}번째 경기 `}</title>
        <meta name='description' content={guestData.content} data-react-helmet='true' />
        <meta name='keywords' content={guestData.title} data-react-helmet='true' />
        <meta property='og:type' content='website' data-react-helmet='true' />
        <meta property='og:site_name' content={guestData.title} data-react-helmet='true' />
        <meta property='og:url' content={`https://match-gi.com/match/${postId}`} data-react-helmet='true' />
        <meta property='og:title' content={guestData.title} data-react-helmet='true' />
        <meta property='og:description' content={guestData.content} data-react-helmet='true' />
        <meta
          property='og:image'
          content={guestData.imgurls.pop() === '' || null ? '/logo512.png' : guestData.imgurls.pop()}
          data-react-helmet='true'
        />
        <link rel='canonical' href={`https://match-gi.com/match/${postId}`} />
      </Helmet>
      <section className='flex flex-col justify-center w-full h-full bg-[#FCFCFC] font-Noto'>
        <div className='w-full h-[124px] pl-[20px] pt-[16px]'>
          <div className='flex mb-[24px] justify-between'>
            <div className='flex flex-row gap-2 items-center'>
              <img
                src={guestData.profileImgUrl !== null ? guestData.profileImgUrl : '/assets/images/avatar.svg'}
                className='w-[36px] h-[36px] rounded-[100%]'
              />
              <p className='font-SD leading-[17px] tracking-[-0.02rem] text-[#BEBEBE]'>{guestData.nickname}</p>
            </div>
            <CopyToClipboard text={url} onCopy={() => alert('링크가 복사되었습니다.')}>
              <button>
                <img src='/assets/images/post/sharebtn.svg'></img>
              </button>
            </CopyToClipboard>
          </div>
          <div
            className={`flex w-full h-[22px] font-medium font-Noto
        leading-[120%] text-[18px] ${guestData.matchStatus === 'MATCHEND' ? ' text-[#9A9B9F]' : ' text-[#38393C]'}`}
          >
            {guestData.title}
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
          <div className='w-full font-Noto leading-[120%] text-[#38393C] mb-[13px] font-medium text-[16px] pl-[20px]'>
            경기정보
          </div>
          <section className='flex flex-row w-11/12 h-[109px] bg-[#FFFFFF] rounded-[16px] justify-left items-center gap-5 font-Noto'>
            <div className='font-medium tracking-[-0.02rem] leading-[150%] text-[#9A9B9F] ml-[25px] font-Noto'>
              <p className='w-full h-7'>경기종목</p>
              <p className='w-full h-7'>모집마감일</p>
            </div>
            <div>
              <p className='w-full h-7'>{guestData.subject}</p>
              <span className='flex flex-row gap-4'>
                <p className='w-[85px] h-7 font-SD'>{changeDataFormat(guestData.matchDeadline)}</p>
                {guestData.matchStatus === 'MATCHEND' ? (
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
          <div className='GuestSubHeader'>경기상세</div>
          <div
            className={`flex w-full h-[236px] py-[10px] px-[12px] gap-[10px] items-start font-Noto ${
              guestData.matchStatus === 'MATCHEND' ? 'text-[#9A9B9F]' : 'text-[#38393C]'
            }`}
            ref={locationRef}
          >
            <pre className='w-full whitespace-pre-wrap font-Noto'>{guestData.content}</pre>
          </div>
        </div>
        <section className='w-full h-[289px] mb-[36px]'>
          <div className='GuestSubHeader'>경기장소</div>
          <div className='flex flex-col w-full h-[270px] items-center p-5'>
            <p
              className={`w-full h-[17px] font-Noto text-[14px] font-medium leading-[120%] mb-[25px] mt-[10px] ${
                guestData.matchStatus === 'MATCHEND' ? 'text-[#9A9B9F]' : 'text-[#38393C]'
              }`}
            >
              {guestData.address}
            </p>
            <StaticMap
              center={{
                lat: guestData.lat,
                lng: guestData.lng,
              }}
              className='w-full h-full rounded-[20px]'
              marker={{
                position: {
                  lat: guestData.lat,
                  lng: guestData.lng,
                },
              }}
              level={3}
            />
          </div>
        </section>
        <div ref={reviewRef} />
        <button
          className='joinBtn'
          onClick={() => {
            alert('참가 신청은 로그인 후 가능합니다.');
            push('/splash');
          }}
        >
          참가 신청하기
        </button>
      </section>
      <ReviewDetail {...drill} />
      <div className='w-full h-[149px] border border-matchgi-gray rounded-[10px] resize-none p-[16px] text-[14px] leading-[150%] mb-[22px]'>
        <textarea
          className='w-full h-[60px] rounded-[10px] resize-none text-[14px] leading-[150%]
            text-[#4A4B4E] tracking-[-0.04em] font-Noto bg-[#FCFCFC] whitespace-pre-wrap focus:outline-none'
          placeholder='댓글은 로그인 후 작성 할 수 있습니다.'
          disabled
        ></textarea>
      </div>
      <GetJoinData {...drill} />
    </>
  );
};
export default GuestPostList;
