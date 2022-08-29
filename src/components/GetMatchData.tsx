import React, { FC } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '../apis';
import { useParams, Link } from 'react-router-dom';
import { PostDataProps, ImageType } from '../typings';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/loadingSpinner';
import { useDispatch } from 'react-redux';
import { addressAction } from '../redux/features/addressSlice';

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
    <section className='flex flex-col justify-center bg-gray-200 w-full h-screen '>
      <div className='flex mt-3 w-full h-10 bg-white justify-between'>
        {postData.title}
        {CompleteBtn()}
      </div>
      <section className='flex h-1/2 justify-center items-center gap-5'>
        {postData &&
          postData.imgurls.map((image: ImageType, id) => (
            <div key={id}>
              <img className='h-72 w-72' alt='' src={image['url']} />
            </div>
          ))}
      </section>
      <section className='flex flex-row gap-1'>
        <div className='w-full h-7 bg-white mt-3'> 모집마감일 : {postData.matchDeadline}</div>
      </section>
      <section className='flex flex-row gap-1'>
        <div className='w-full h-7 bg-white mt-3'> 종목 : {postData.subject}</div>
      </section>
      <section className='flex w-full bg-white mt-3'>주소 : {postData.address}</section>
      <div className='mb-5 w-full h-2/5'>{postData.content}</div>
      <div className='flex items-center justify-center gap-5'>
        {postData.owner === 1 ? (
          <>
            <Link
              to={`/new/${postId}/edit`}
              state={{
                postId: postId,
                title: postData.title,
                subject: postData.subject,
                lat: postData.lat,
                lng: postData.lng,
                imgurls: postData.imgurls,
                imgpaths: postData.imgpaths,
                matchDeadline: postData.matchDeadline,
                content: postData.content,
              }}
            >
              <button
                className='bg-white mb-5'
                type='button'
                onClick={() =>
                  dispatch(addressAction({ address: postData.address, lat: postData.lat, lng: postData.lng }))
                }
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
            <button className='bg-white mb-5' type='button' onClick={handleJoinTheGame}>
              참가 신청하기
            </button>
            <button className='bg-white mb-5' type='button' onClick={() => navigate(-1)}>
              뒤로가기
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default GetMatchData;
