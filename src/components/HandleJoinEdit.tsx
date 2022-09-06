import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addressAction } from '../redux/features/addressSlice';
import { calendarAction } from '../redux/features/calendarSlice';
import { subjectAction } from '../redux/features/subjectSlice';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { apis } from '../apis';
import { JoinDataProps } from '../typings';

const HandleJoinEdit = (props: JoinDataProps) => {
  const date = new Date();
  const nowDate = dayjs(date).format('YYYY-MM-DD');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postData = useMemo(() => props.data, [props.data]);
  const handleJoinTheGame = async () => {
    try {
      if (window.confirm('참가 신청 하시겠습니까?')) {
        await apis.postJoinGame(postData.postId);
        alert('참가 신청이 완료되었습니다.');
        queryClient.invalidateQueries(['postList']);
      }
    } catch (err) {
      alert('참가 신청은 중복으로 할 수 없습니다.');
    }
  };
  const handleDeletePost = async () => {
    try {
      if (window.confirm('게시글을 삭제하시겠습니까?')) {
        await apis.deletePost(postData.postId);
        navigate(-1);
      }
    } catch (err) {
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  if (postData.owner === 1 && postData.matchStatus === 'ONGOING') {
    return (
      <div>
        <button
          className='w-1/2 h-[48px] border border-matchgi-bordergray rounded-[4px] bg-[#FCFCFC] text-[#38393C] cursor-pointer'
          type='button'
          onClick={handleDeletePost}
        >
          삭제
        </button>
        <Link
          to={`/new/${postData.postId}/edit`}
          state={{
            postId: postData.postId,
            title: postData.title,
            imgurls: postData.imgurls,
            imgpaths: postData.imgpaths,
            content: postData.content,
          }}
        >
          <button
            className='w-1/2 h-[48px] border border-matchgi-bordergray rounded-[4px] bg-matchgi-btnblue text-[#FFFFFF] cursor-pointer mb-[36px]'
            type='button'
            onClick={() => {
              dispatch(addressAction({ address: postData.address, lat: postData.lat, lng: postData.lng }));
              dispatch(subjectAction({ subject: postData.subject, value: postData.subjectValue }));
              dispatch(calendarAction({ date: postData.matchDeadline }));
            }}
          >
            수정하기
          </button>
        </Link>
      </div>
    );
  } else if (postData.owner === 1 && postData.matchStatus === 'MATCHEND') {
    return <></>;
  } else if (postData.owner === -1 && postData.player === 1 && nowDate > postData.matchDeadline === false) {
    return <></>;
  } else if (postData.owner === -1 && postData.player === -1 && nowDate > postData.matchDeadline === false) {
    return (
      <button
        className='w-[100%] h-[48px] border border-matchgi-bordergray rounded-[4px] bg-matchgi-btnblue text-[#FCFCFC] cursor-pointer mb-[36px]'
        type='button'
        onClick={handleJoinTheGame}
      >
        참가 신청하기
      </button>
    );
  } else if (postData.owner === -1 && postData.player === -1 && nowDate >= postData.matchDeadline === true) {
    return <></>;
  } else {
    return <></>;
  }
};

export default HandleJoinEdit;
