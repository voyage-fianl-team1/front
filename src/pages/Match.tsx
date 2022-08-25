import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import { useParams, Link } from 'react-router-dom';
import { PostDataProps, JoinDataProps, ImageType } from '../typings';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/loadingSpinner';

const Match: FC = () => {
  const param = useParams();
  const postId = Number(param.id);
  const res = useQuery(['postList'], async () => await apis.getPostList(postId));
  const join = useQuery(['joinList'], async () => await apis.getJoinList(postId));
  const getPostData = () => {
    const navigate = useNavigate();
    const handleJoinTheGame = async () => {
      try {
        await apis.postJoinGame(postId);
        alert('참가 신청이 완료되었습니다.');
      } catch (err) {
        alert('참가 신청은 중복으로 할 수 없습니다.');
      }
    };
    const handleDeletePost = async () => {
      try {
        await apis.deletePost(postId);
        navigate(-1);
      } catch (err) {
        alert('게시글 삭제에 실패했습니다.');
      }
    };
    const handleStatusChange = async () => {
      apis.updateMatchStatus(postId);
      window.location.reload();
    };

    if (res.isLoading) {
      return <LoadingSpinner />;
    }
    if (res.data) {
      const postData: PostDataProps = res.data.data;
      return (
        <section className='flex flex-col justify-center bg-gray-200 w-full h-screen '>
          <div className='flex mt-3 w-full h-10 bg-white justify-between'>
            {postData.title}
            <button type='button' className='bg-black text-white' onClick={handleStatusChange}>
              {postData.owner === 1 && postData.matchStatus === 'ONGOING' ? '완료하기' : '되돌리기'}
            </button>
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
            <div className='w-full'>
              모집마감일
              <div className='w-full h-7 bg-white'>{postData.matchDeadline}</div>
            </div>
          </section>
          종목
          <div className='mb-5 w-full h-10 bg-white'>{postData.subject}</div>
          <section className='flex w-full bg-white mt-3 justify-between'>
            <span>{postData.address}</span>
          </section>
          <div className='mb-5 w-full h-2/5'>{postData.content}</div>
          {postData.owner === 1 ? getJoinData() : null}
          <div className='flex items-center justify-center gap-5'>
            {postData.owner === 1 ? (
              <>
                <Link
                  to={`/new/${postId}/edit`}
                  state={{
                    postId: postId,
                    title: postData.title,
                    subject: postData.subject,
                    address: postData.address,
                    lat: postData.lat,
                    lng: postData.lng,
                    imgurls: postData.imgurls,
                    imgpaths: postData.imgpaths,
                    matchDeadline: postData.matchDeadline,
                    content: postData.content,
                  }}
                >
                  <button className='bg-white mb-5' type='button'>
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
    }
  };

  const getJoinData = () => {
    if (join.isLoading) {
      return <LoadingSpinner />;
    }
    if (join.data && res.data?.data.matchStatus === 'ONGOING') {
      const joinData: JoinDataProps = join.data.data;
      return (
        <section className='flex h-24 justify-center items-center'>
          {joinData &&
            joinData.userList.map((value: ImageType, id: number) => (
              <>
                <div key={id} className='flex'>
                  {value.nickname}
                  {value.status}
                </div>
                <div className='flex gap-2'>
                  <button
                    type='button'
                    onClick={async () => await apis.updateTotalStatus(value.requestId, { status: 'ACCEPT' })}
                  >
                    승인
                  </button>
                  <button
                    type='button'
                    onClick={async () => await apis.updateTotalStatus(value.requestId, { status: 'REJECT' })}
                  >
                    거절
                  </button>
                </div>
              </>
            ))}
        </section>
      );
    }
    if (join.data && res.data?.data.matchStatus === 'MATCHEND') {
      const joinData: JoinDataProps = join.data.data;
      return (
        <section className='flex h-24 justify-center items-center'>
          {joinData &&
            joinData.userList.map((value: ImageType, id: number) => (
              <>
                <div key={id} className='flex'>
                  {value.nickname}
                  {value.status}
                </div>
                <div className='flex gap-2'>
                  <button
                    type='button'
                    onClick={async () => await apis.updateTotalStatus(value.requestId, { status: 'WIN' })}
                  >
                    승
                  </button>
                  <button
                    type='button'
                    onClick={async () => await apis.updateTotalStatus(value.requestId, { status: 'DRAW' })}
                  >
                    무
                  </button>
                  <button
                    type='button'
                    value='LOSE'
                    onClick={async () => await apis.updateTotalStatus(value.requestId, { status: 'LOSE' })}
                  >
                    패
                  </button>
                </div>
              </>
            ))}
        </section>
      );
    }
  };

  return <div>{getPostData()}</div>;
};

export default Match;
