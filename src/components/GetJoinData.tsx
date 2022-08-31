import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from './loadingSpinner';
import { JoinDataProps, JoinData, ImageType } from '../typings';
import { apis } from '../apis';
import dayjs from 'dayjs';
import { AxiosError } from 'axios';

const GetJoinData = (props: JoinDataProps) => {
  const join = useQuery(['joinList'], async () => await apis.getJoinList(props.data.postId));
  const acceptList = useQuery(['accpetList'], async () => await apis.getAcceptList(props.data.postId));
  const acceptData = acceptList?.data?.data;
  const date = new Date();
  const nowDate = dayjs(date).format('YYYY-MM-DD');
  const joinData: JoinData = join?.data?.data;
  console.log(acceptList.data);
  const queryClient = useQueryClient();
  const postData = props?.data;
  const handleStatusChange = async () => {
    try {
      await apis.updateMatchStatus(postData.postId);
    } catch (err) {
      if (err && err instanceof AxiosError) {
        alert(err.response?.data);
      }
    }
    queryClient.invalidateQueries(['postList']);
  };

  const CompleteBtn = () => {
    if (nowDate > postData.matchDeadline && postData.owner === 1 && postData.matchStatus === 'ONGOING') {
      return (
        <>
          <button
            type='button'
            className='w-[100%] h-[48px] border border-matchgi-bordergray rounded-[4px] bg-matchgi-btnblue text-[#FFFFFF] cursor-pointer mb-[36px]'
            onClick={handleStatusChange}
          >
            완료하기
          </button>
        </>
      );
    } else if (postData.owner === -1) {
      return;
    } else {
      return;
    }
  };

  if (join.isLoading) {
    return <LoadingSpinner />;
  }
  if (joinData.userList.length < 1) {
    return (
      <>
        <div className='w-full h-[200px] bg-[#FCFCFC]'>
          <p
            className='w-full h-[34px] font-Noto font-medium leading-[24px] text-[16 px] text-[#38393C] border border-[#EDEDED]
  border-x-0 border-t-0 pl-[20px] mb-[22px]'
          >
            경기 가입 신청 목록
          </p>
          <p className='text-sm text-[#38393C] my-8 ml-3'>신청한 사람이 없습니다.</p>
        </div>
      </>
    );
  }

  if (postData.owner === 1 && postData.matchStatus === 'ONGOING' && nowDate > postData.matchDeadline === false) {
    return (
      <section className='flex flex-col w-full h-full bg-[#FCFCFC]'>
        <p
          className='w-full h-[34px] font-Noto font-medium leading-[24px] text-[16 px] text-[#38393C] border border-[#EDEDED]
        border-x-0 border-t-0 pl-[20px] mb-[22px]'
        >
          경기 가입 신청 목록
        </p>
        {joinData &&
          joinData.userList.map((value: ImageType, id: number) => (
            <>
              <div
                key={id}
                className='flex flex-col w-full h-[140px] justify-center items-center bg-[#F4F5F5] rounded-[10px] mb-[22px]'
              >
                <div className='flex flex-row w-full h-[20px] items-center gap-3 ml-[16px]'>
                  <img
                    src={
                      value.profileImgUrl !== null
                        ? value.profileImgUrl
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                    }
                    className='w-[36px] h-[36px] rounded-[100%]'
                  />
                  <span>{value.nickname}</span>
                </div>

                <div className='flex flex-row gap-[32px] mt-[32px]'>
                  <button
                    type='button'
                    className={`w-[132px] h-[36px] bg-[#FFF] rounded-[4px] ] ${
                      value.status === 'REJECT' ? 'bg-red-500 text-[#FFF]' : 'bg-[#FFF] border border-[#949B9F'
                    }`}
                    value='REJECT'
                    onClick={async () => {
                      await apis.updateTotalStatus(value.requestId, { status: 'REJECT' });
                      queryClient.invalidateQueries(['joinList']);
                    }}
                  >
                    거절
                  </button>
                  <button
                    type='button'
                    value='ACCEPT'
                    className={`w-[132px] h-[36px] rounded-[4px]] ${
                      value.status === 'ACCEPT' ? 'bg-[#14308B] text-[#FFF]' : 'bg-[#FFF] border border-[#949B9F'
                    }`}
                    onClick={async () => {
                      await apis.updateTotalStatus(value.requestId, { status: 'ACCEPT' });
                      queryClient.invalidateQueries(['joinList']);
                    }}
                  >
                    승인
                  </button>
                </div>
              </div>
            </>
          ))}
      </section>
    );
  }
  if (postData.owner === -1 && postData.matchStatus === 'ONGOING' && nowDate > postData.matchDeadline === false) {
    return (
      <section className='flex flex-col w-full h-full bg-[#FCFCFC]'>
        <p className='w-full h-[34px] font-Noto font-medium leading-[24px] text-[16 px] text-[#38393C] border border-[#EDEDED] border-x-0 border-t-0 pl-[20px] mb-[22px]'>
          경기 가입 신청 목록
        </p>
        {joinData &&
          joinData.userList.map((value: ImageType, id: number) => (
            <>
              <div
                key={id}
                className='flex flex-col w-full h-[140px] justify-center items-center bg-[#F4F5F5] rounded-[10px] mb-[22px]'
              >
                <div className='flex flex-row w-full h-[20px] items-center gap-3 ml-[16px]'>
                  <img
                    src={
                      value.profileImgUrl !== null
                        ? value.profileImgUrl
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                    }
                    className='w-[36px] h-[36px] rounded-[100%]'
                  />
                  <span>{value.nickname}</span>
                </div>
                <div className='w-[132px] h-[36px] bg-[#14308B] rounded-[4px] text-[#FFF] flex justify-center items-center mt-[36px]'>
                  {value.status}
                </div>
              </div>
            </>
          ))}
      </section>
    );
  } else if (postData.owner === 1 && nowDate > postData.matchDeadline === true && postData.matchStatus === 'ONGOING') {
    return (
      <section className='flex flex-col w-full h-full bg-[#FCFCFC]'>
        <p
          className='w-full h-[34px] font-Noto font-medium leading-[24px] text-[16 px] text-[#38393C] border border-[#EDEDED]
        border-x-0 border-t-0 pl-[20px] mb-[22px]'
        >
          경기 결과 등록
        </p>
        {acceptData &&
          acceptData.map((value: ImageType, id: number) => (
            <>
              <div
                key={id}
                className='flex flex-col w-full h-[140px] justify-center items-center bg-[#F4F5F5] rounded-[10px] mb-[16px]'
              >
                <div className='flex flex-row w-full h-[20px] items-center gap-3 ml-[16px]'>
                  <img
                    src={
                      value.profileImgUrl !== null
                        ? value.profileImgUrl
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                    }
                    className='w-[36px] h-[36px] rounded-[100%]'
                  />
                  <span>{value.nickname}</span>
                </div>
                <div className='flex flex-row gap-[33px]'>
                  <button
                    className={`box-border w-[82px] h-[36px] rounded-[4px] flex justify-center items-center mt-[36px]
                    ${
                      value.status === 'WIN'
                        ? 'bg-[#14308B] text-[#FFF]'
                        : 'bg-[#FFF] text-[#38393c] border border-[#C5C6CA]'
                    }`}
                    onClick={async () => {
                      await apis.updateTotalStatus(value.requestId, { status: 'WIN' });
                    }}
                  >
                    승
                  </button>
                  <button
                    className={`box-border w-[82px] h-[36px] rounded-[4px] flex justify-center items-center mt-[36px]
                    ${
                      value.status === 'LOSE'
                        ? 'bg-red-600 text-[#FFF]'
                        : 'bg-[#FFF] text-[#38393c] border border-[#C5C6CA]'
                    }`}
                    onClick={async () => {
                      await apis.updateTotalStatus(value.requestId, { status: 'LOSE' });
                    }}
                  >
                    패
                  </button>
                  <button
                    className={`box-border w-[82px] h-[36px] rounded-[4px] flex justify-center items-center mt-[36px]
                     ${
                       value.status === 'DRAW'
                         ? 'bg-yellow text-[#FFF]'
                         : 'bg-[#FFF] text-[#38393c] border border-[#C5C6CA]'
                     }`}
                    onClick={async () => await apis.updateTotalStatus(value.requestId, { status: 'DRAW' })}
                  >
                    무
                  </button>
                </div>
              </div>
            </>
          ))}
        {CompleteBtn()}
      </section>
    );
  }
  if (nowDate > postData.matchDeadline === true && postData.matchStatus === 'MATCHEND') {
    return (
      <section className='flex flex-col w-full h-full bg-[#FCFCFC]'>
        <p
          className='w-full h-[34px] font-Noto font-medium leading-[24px] text-[16 px] text-[#38393C] border border-[#EDEDED]
      border-x-0 border-t-0 pl-[20px] mb-[22px]'
        >
          경기 결과
        </p>
        {joinData &&
          joinData.userList.map((value: ImageType, id: number) => (
            <>
              <div
                key={id}
                className='flex flex-col w-full h-[140px] justify-center items-center bg-[#F4F5F5] rounded-[10px] mb-[16px]'
              >
                <div className='flex flex-row w-full h-[20px] items-center gap-3 ml-[16px]'>
                  <img
                    src={
                      value.profileImgUrl !== null
                        ? value.profileImgUrl
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                    }
                    className='w-[36px] h-[36px] rounded-[100%]'
                  />
                  <span>{value.nickname}</span>
                </div>
                <div className='box-border w-[132px] h-[36px] bg-[#14308B] rounded-[4px] text-[#FFF] flex justify-center items-center mt-[36px]'>
                  {value.status}
                </div>
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
