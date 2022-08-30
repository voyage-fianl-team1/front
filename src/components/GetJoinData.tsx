import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './loadingSpinner';
import { JoinDataProps, ImageType } from '../typings';
import { apis } from '../apis';
import { IProps } from './GetMatchData';

const GetJoinData = (props: IProps) => {
  const join = useQuery(['joinList'], async () => await apis.getJoinList(props.data.postId));
  const joinData: JoinDataProps = join?.data?.data;
  const postData = props.data;
  if (join.isLoading) {
    return <LoadingSpinner />;
  }
  if (joinData.userList.length < 1) {
    return (
      <>
        <div className='w-full h-[400px] bg-[#FCFCFC]'>
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
  if (postData.owner === 1 && postData.matchStatus === 'ONGOING') {
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
                className='flex flex-col w-full h-[140px] justify-center items-center bg-[#F4F5F5] rounded-[10px]'
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
                    className='w-[132px] h-[36px] bg-[#FFF] rounded-[4px] border border-[#949B9F]'
                    onClick={async () => await apis.updateTotalStatus(value.requestId, { status: 'REJECT' })}
                  >
                    거절
                  </button>
                  <button
                    type='button'
                    className='w-[132px] h-[36px] bg-[#14308B] rounded-[4px] text-[#FFF]'
                    onClick={async () => await apis.updateTotalStatus(value.requestId, { status: 'ACCEPT' })}
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
  if (postData.owner === -1 && postData.matchStatus === 'ONGOING') {
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
                <div className='w-[132px] h-[36px] bg-[#14308B] rounded-[4px] text-[#FFF] flex justify-center items-center mt-[36px]'>
                  {value.status}
                </div>
              </div>
            </>
          ))}
      </section>
    );
  }
  if (postData.owner === 1 && postData.matchStatus === 'MATCHEND') {
    return (
      <section className='flex flex-col w-full h-24 justify-center items-start ml-5'>
        {joinData &&
          joinData.userList.map((value: ImageType, id: number) => (
            <div key={id} className='flex flex-row gap-5'>
              <span>{value.nickname}</span>
              <span>{value.status}</span>
              <div className='gap-5'>
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
                  onClick={async () => await apis.updateTotalStatus(value.requestId, { status: 'LOSE' })}
                >
                  패
                </button>
              </div>
            </div>
          ))}
      </section>
    );
  }
  if (postData.owner === -1 && postData.matchStatus === 'MATCHEND') {
    return (
      <section className='flex flex-col w-full h-24 justify-center items-start ml-5'>
        {joinData &&
          joinData.userList.map((value: ImageType, id: number) => (
            <div key={id} className='flex flex-row gap-5'>
              <span>{value.nickname}</span>
              <span>{value.status}</span>
              <div className='gap-5'>
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
                  onClick={async () => await apis.updateTotalStatus(value.requestId, { status: 'LOSE' })}
                >
                  패
                </button>
              </div>
            </div>
          ))}
      </section>
    );
  } else {
    return <></>;
  }
};
export default GetJoinData;
