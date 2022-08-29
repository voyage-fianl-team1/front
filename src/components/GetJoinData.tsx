import React, { FC, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './loadingSpinner';
import { JoinDataProps, ImageType } from '../typings';
import { apis } from '../apis';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { joinClear } from '../redux/features/joinSlice';

const GetJoinData: FC = () => {
  const postId = useSelector((state: RootState) => state.persistReducered.join.postId);
  const matchStatus = useSelector((state: RootState) => state.persistReducered.join.matchStatus);
  const dispatch = useDispatch();
  const join = useQuery(['joinList'], async () => await apis.getJoinList(postId));
  const joinData: JoinDataProps = join?.data?.data;
  useEffect(() => {
    return () => {
      dispatch(joinClear());
    };
  }, []);
  if (join.isLoading) {
    return <LoadingSpinner />;
  }
  if (matchStatus === 'ONGOING') {
    return (
      <section className='flex flex-col w-full h-24 justify-center items-start ml-5'>
        {joinData &&
          joinData.userList.map((value: ImageType, id: number) => (
            <div key={id} className='flex border border-gray-50 gap-5'>
              <span>{value.nickname}</span>
              <span>{value.status}</span>

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
            </div>
          ))}
      </section>
    );
  } else {
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
};
export default GetJoinData;
