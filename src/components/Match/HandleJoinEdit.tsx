import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { JoinDataProps } from '../../typings';
import { useJoin } from '../../hooks/useJoin';
import dayjs from 'dayjs';

const HandleJoinEdit = (props: JoinDataProps) => {
  const { handleJoinTheGame, handleDispatchData, handleDeletePost } = useJoin('');
  const postData = useMemo(() => props.data, [props.data]);
  const nowDate = dayjs(new Date()).format('YYYY-MM-DD');
  const postId = postData?.postId;

  if (postData.owner === 1 && postData.matchStatus === 'ONGOING') {
    return (
      <div>
        <button
          className='w-1/2 h-[48px] border border-matchgi-bordergray rounded-[4px] bg-[#FCFCFC] text-[#38393C] cursor-pointer'
          onClick={() => handleDeletePost(postId)}
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
            onClick={() =>
              handleDispatchData(
                postData.address,
                postData.lat,
                postData.lng,
                postData.subject,
                postData.subjectValue,
                postData.matchDeadline
              )
            }
          >
            수정하기
          </button>
        </Link>
      </div>
    );
  } else if (postData.owner === -1 && postData.player === -1 && nowDate > postData.matchDeadline === false) {
    return (
      <button className='joinBtn' onClick={() => handleJoinTheGame(postId)}>
        참가 신청하기
      </button>
    );
  } else if (postData.owner === -1 && postData.player === 1 && nowDate > postData.matchDeadline === false) {
    return <></>;
  } else if (postData.owner === -1 && postData.player === -1 && nowDate >= postData.matchDeadline === true) {
    return <></>;
  } else if (postData.owner === 1 && postData.matchStatus === 'MATCHEND') {
    return <></>;
  } else {
    return <></>;
  }
};

export default HandleJoinEdit;
