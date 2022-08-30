import React, { FC } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '../apis';
import { useParams, Link } from 'react-router-dom';
import { PostDataProps, ImageType } from '../typings';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/loadingSpinner';
import { useDispatch } from 'react-redux';
import { addressAction } from '../redux/features/addressSlice';
import { subjectAction } from '../redux/features/subjectSlice';
import { calendarAction } from '../redux/features/calendarSlice';
import { StaticMap } from 'react-kakao-maps-sdk';

const GetMatchData: FC = () => {
  const param = useParams();
  const postId = Number(param.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: res, isLoading } = useQuery(['postList'], async () => await apis.getPostList(postId));
  const postData: PostDataProps = res?.data;
  console.log(postData);
  const handleJoinTheGame = async () => {
    try {
      if (window.confirm('참가 신청 하시겠습니까?')) {
        await apis.postJoinGame(postId);
      }
      alert('참가 신청이 완료되었습니다.');
      navigate('/');
    } catch (err) {
      alert('참가 신청은 중복으로 할 수 없습니다.');
    }
  };
  const handleDeletePost = async () => {
    try {
      if (window.confirm('게시글을 삭제하시겠습니까?')) {
        await apis.deletePost(postId);
        navigate(-1);
      }
    } catch (err) {
      alert('게시글 삭제에 실패했습니다.');
    }
  };
  const handleStatusChange = async () => {
    await apis.updateMatchStatus(postId);
    queryClient.invalidateQueries(['postList']);
  };

  const CompleteBtn = () => {
    if (postData.owner === 1 && postData.matchStatus === 'ONGOING') {
      return (
        <>
          <button type='button' className='bg-black text-white' onClick={handleStatusChange}>
            완료하기
          </button>
        </>
      );
    } else if (postData.owner === 1 && postData.matchStatus === 'MATCHEND') {
      return (
        <>
          <button type='button' className='bg-black text-white' onClick={handleStatusChange}>
            되돌리기
          </button>
        </>
      );
    } else if (postData.owner === -1) {
      return;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
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
      </div>
      <div className='flex flex-row w-full justify-center border border-matchgi-bordergray'>
        <div className='w-1/3 flex justify-center border border-x-matchgi-bordergray'>
          <p>경기정보</p>
        </div>
        <div className='w-1/3 flex justify-center border border-x-matchgi-bordergray'>
          <p>경기상세</p>
        </div>
        <div className='w-1/3 flex justify-center border border-x-matchgi-bordergray'>
          <p>경기장소</p>
        </div>
      </div>
      <section className='flex h-1/2 justify-center items-center gap-5'>
        {postData &&
          postData.imgurls.map((image: ImageType, id) => (
            <div key={id}>
              <img className='h-72 w-72' alt='' src={image['url']} />
            </div>
          ))}
      </section>
      <div className='w-full h-[199px] bg-[#F4F5F5] flex flex-col justify-center items-center mb-[28px]'>
        <p className='w-full font-Noto leading-[120%] text-[#000] mb-[13px] font-medium text-[16px] pl-[20px]'>
          경기정보
        </p>
        <section className='flex flex-row w-11/12 h-[109px] bg-[#FFFFFF] rounded-[16px] justify-left items-center gap-5 font-Noto'>
          <div className='font-medium tracking-[-0.02rem] leading-[150%] text-[#9A9B9F] ml-[25px]'>
            <div className='w-full h-7'>경기종목</div>
            <div className='w-full h-7'>모집마감일</div>
          </div>
          <div>
            <div className='w-full h-7'>{postData.subject}</div>
            <div className='w-full h-7'>{postData.matchDeadline}</div>
          </div>
        </section>
      </div>
      <section className='w-full h-[283px] mb-[28px]'>
        <p className='w-full h-[30px] font-Noto font-medium text-[16px] leading-[120%] text-[#38393C] border border-x-0 border-t-0 border-b-matchgi-bordergray pl-[20px]'>
          경기상세
        </p>
        <div className='flex w-full h-[236px] py-[10px] px-[12px] gap-[10px] items-start'>{postData.content}</div>
      </section>
      <section className='w-full h-[289px] mb-[60px]'>
        <p className='w-full h-[30px] font-Noto font-medium text-[16px] leading-[120%] text-[#38393C] border border-x-0 border-t-0 border-b-matchgi-bordergray pl-[20px]'>
          경기장소
        </p>
        <div className='flex flex-col w-full h-[270px] items-center text-center my-auto p-5'>
          <p className='w-full h-[17px] font-Noto text-[12px] font-medium leading-[120%] mb-[25px] mt-[17.5px]'>
            {postData.address}
          </p>
          {postData && (
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
          )}
        </div>
      </section>
      <div className='flex items-center justify-center gap-5'>
        {postData.owner === 1 ? (
          <>
            <Link
              to={`/new/${postId}/edit`}
              state={{
                postId: postId,
                title: postData.title,
                lat: postData.lat,
                lng: postData.lng,
                imgurls: postData.imgurls,
                imgpaths: postData.imgpaths,
                content: postData.content,
              }}
            >
              <button
                className='bg-white mb-5'
                type='button'
                onClick={() => {
                  dispatch(addressAction({ address: postData.address, lat: postData.lat, lng: postData.lng }));
                  dispatch(subjectAction({ subject: postData.subject, value: postData.subject }));
                  dispatch(calendarAction({ date: postData.matchDeadline }));
                }}
              >
                수정하기
              </button>
            </Link>
            <button className='bg-white mb-5' type='button' onClick={handleDeletePost}>
              삭제
            </button>
          </>
        ) : (
          <>
            <button
              className='w-[100%] h-[48px] border border-matchgi-bordergray rounded-[4px] bg-matchgi-btnblue text-white cursor-pointer'
              type='button'
              onClick={handleJoinTheGame}
            >
              참가 신청하기
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default GetMatchData;
