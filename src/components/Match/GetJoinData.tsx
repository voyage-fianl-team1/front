import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { JoinDataProps, JoinData, ImageType } from '../../typings';
import { apis } from '../../apis';
import { scoreStatus } from '../../shared/constant/scoreTable';
import { useJoin } from '../../hooks/useJoin';
import { useUtil } from '../../hooks/post/useUtil';
import LoadingSpinner from '../Common/loadingSpinner';

const GetJoinData = (props: JoinDataProps) => {
  const { handleStatusChange, handleScoreChange } = useJoin('');
  const { nowDate } = useUtil('');
  const join = useQuery(['joinList'], async () => await apis.getJoinList(props.data.postId));
  const { data: acceptList } = useQuery(['acceptlist'], async () => await apis.getAcceptList(props.data.postId));
  const joinData: JoinData = join?.data?.data;
  const acceptData = acceptList?.data;
  const postData = props?.data;

  if (join.isLoading) {
    return <LoadingSpinner />;
  }
  if (joinData.userList.length < 1) {
    return (
      <>
        <div className='w-full h-[200px] bg-[#FCFCFC]'>
          <p className='joinHeader'>경기 가입 신청 목록</p>
          <p className='text-sm text-[#38393C] my-8 ml-3'>신청한 사람이 없습니다.</p>
        </div>
      </>
    );
  }

  if (postData.owner === 1 && postData.matchStatus === 'ONGOING') {
    return (
      <section className='flex flex-col w-full h-full bg-[#FCFCFC]'>
        <p className='joinHeader'>경기 가입 신청 목록</p>
        {joinData &&
          joinData.userList.map((value: ImageType, id: number) => (
            <>
              <div
                key={id}
                className='flex flex-col w-full h-[140px] justify-center items-center bg-[#F4F5F5] rounded-[10px] mb-[22px]'
              >
                <div className='flex flex-row w-full h-[20px] items-center gap-3 ml-[16px]'>
                  <img
                    src={value.profileImgUrl !== null ? value.profileImgUrl : '/assets/images/avatar.svg'}
                    className='w-[36px] h-[36px] rounded-[100%]'
                  />
                  <span>{value.nickname}</span>
                </div>

                <div className='flex flex-row gap-[32px] mt-[32px]'>
                  <button
                    type='button'
                    className={`w-[132px] h-[36px] bg-[#FFF] rounded-[4px] ] ${
                      value.status === 'REJECT' ? 'bg-[#14308B] text-[#FFF]' : 'bg-[#FFF] border border-[#949B9F'
                    }`}
                    value='REJECT'
                    onClick={(e) => handleScoreChange(value.requestId, e.currentTarget.value)}
                    disabled={value.status === 'REJECT' ? true : false}
                  >
                    거절
                  </button>
                  <button
                    type='button'
                    value='ACCEPT'
                    className={`w-[132px] h-[36px] rounded-[4px]] ${
                      value.status === 'ACCEPT' ? 'bg-[#14308B] text-[#FFF]' : 'bg-[#FFF] border border-[#949B9F'
                    }`}
                    onClick={(e) => handleScoreChange(value.requestId, e.currentTarget.value)}
                    disabled={value.status === 'ACCEPT' ? true : false}
                  >
                    승인
                  </button>
                </div>
              </div>
            </>
          ))}
        {nowDate >= postData.matchDeadline === true && postData.owner === 1 && postData.matchStatus === 'ONGOING' ? (
          <button
            className='w-[100%] h-[48px] border border-matchgi-bordergray rounded-[4px] bg-matchgi-btnblue text-[#FFFFFF] cursor-pointer mb-[36px]'
            onClick={() => handleStatusChange(postData.postId)}
          >
            완료하기
          </button>
        ) : (
          ''
        )}
      </section>
    );
  }
  if (postData.owner === -1 && postData.matchStatus === 'ONGOING') {
    return (
      <section className='flex flex-col w-full h-full bg-[#FCFCFC]'>
        <p className='joinHeader'>경기 가입 신청 목록</p>
        {joinData &&
          joinData.userList.map((value: ImageType, id: number) => (
            <>
              <div
                key={id}
                className='flex flex-col w-full h-[140px] justify-center items-center bg-[#F4F5F5] rounded-[10px] mb-[22px]'
              >
                <div className='flex flex-row w-full h-[20px] items-center gap-3 ml-[16px]'>
                  <img
                    src={value.profileImgUrl !== null ? value.profileImgUrl : '/assets/images/avatar.svg'}
                    className='w-[36px] h-[36px] rounded-[100%]'
                  />
                  <span>{value.nickname}</span>
                </div>
                <div className='joinStatus'>{scoreStatus[value.status]}</div>
              </div>
            </>
          ))}
      </section>
    );
  }
  if (
    postData.owner === 1 &&
    nowDate >= postData.matchDeadline === true &&
    postData.matchStatus === 'MATCHEND' &&
    acceptData?.length >= 1
  ) {
    return (
      <section className='flex flex-col w-full h-full bg-[#FCFCFC]'>
        <p className='joinHeader'>경기 결과 등록</p>
        {acceptData &&
          acceptData.map((value: ImageType, id: number) => (
            <>
              <div
                key={id}
                className='flex flex-col w-full h-[140px] justify-center items-center bg-[#F4F5F5] rounded-[10px] mb-[16px]'
              >
                <div className='flex flex-row w-full h-[20px] items-center gap-3 ml-[16px]'>
                  <img
                    src={value.profileImgUrl !== null ? value.profileImgUrl : '/assets/images/avatar.svg'}
                    className='w-[36px] h-[36px] rounded-[100%]'
                  />
                  <span>{value.nickname}</span>
                </div>
                <div className='flex flex-row gap-[33px]'>
                  <button
                    className='joinScore'
                    value='WIN'
                    onClick={(e) => handleScoreChange(value.requestId, e.currentTarget.value)}
                  >
                    승
                  </button>
                  <button
                    className='joinScore'
                    value='LOSE'
                    onClick={(e) => handleScoreChange(value.requestId, e.currentTarget.value)}
                  >
                    패
                  </button>
                  <button
                    className='joinScore'
                    value='DRAW'
                    onClick={(e) => handleScoreChange(value.requestId, e.currentTarget.value)}
                  >
                    무
                  </button>
                </div>
              </div>
            </>
          ))}
      </section>
    );
  }
  if (nowDate >= postData.matchDeadline === true && postData.matchStatus === 'MATCHEND' && acceptData?.length === 0) {
    return (
      <section className='flex flex-col w-full h-full bg-[#FCFCFC]'>
        <p className='joinHeader'>경기 결과</p>
        {joinData &&
          joinData.userList.map((value: ImageType, id: number) => (
            <>
              <div
                key={id}
                className={`flex flex-col w-full h-[140px] justify-center items-center bg-[#F4F5F5] rounded-[10px] mb-[16px] ${
                  value.status === 'REJECT' || value.status === 'PENDING' ? 'hidden' : ''
                }`}
              >
                <div className='flex flex-row w-full h-[20px] items-center gap-3 ml-[16px]'>
                  <img
                    src={value.profileImgUrl !== null ? value.profileImgUrl : '/assets/images/avatar.svg'}
                    className='w-[36px] h-[36px] rounded-[100%]'
                  />
                  <span>{value.nickname}</span>
                </div>
                <div className='joinStatus'>{scoreStatus[value.status]}</div>
              </div>
            </>
          ))}
      </section>
    );
  } else {
    return <></>;
  }
};
export default GetJoinData;
