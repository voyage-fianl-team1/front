import React, { useMemo } from 'react';
import { JoinDataProps, ImageType } from '../../typings';
import { changeDataFormat } from '../../util/converDate';
import { useReviewDetail } from '../../hooks/queries/useReviewDetail';
import LoadingSpinner from '../Common/loadingSpinner';

const ReviewDetail = (props: JoinDataProps) => {
  const reviewDatail = useMemo(() => props.data, [props.data]);
  const { reviewList, isLoading } = useReviewDetail(reviewDatail.postId);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (reviewList.length < 1) {
    return (
      <div className='w-full h-[200px] bg-[#FCFCFC]'>
        <p
          className='w-full h-[34px] font-Noto font-medium leading-[24px] text-[16px] text-[#38393C] border border-[#EDEDED]
  border-x-0 border-t-0 pl-[20px] mb-[22px]'
        >
          댓글
        </p>
        <p className='text-sm text-[#38393C] my-8 ml-3 font-Noto'>작성된 댓글이 없습니다.</p>
      </div>
    );
  }
  if (reviewList.length >= 1) {
    return (
      <section className='flex flex-col w-full h-full bg-[#FCFCFC] mb-[42px]'>
        <p
          className='w-full h-[34px] font-Noto font-medium leading-[24px] text-[16 px] text-[#38393C] border border-[#EDEDED]
  border-x-0 border-t-0 pl-[20px] mb-[22px]'
        >
          댓글
        </p>
        {reviewList &&
          reviewList.map((value: ImageType, id: number) => (
            <>
              <div key={id} className='flex flex-col w-full h-full'>
                <div className='flex flex-row w-full h-[20px] items-center gap-3 ml-[16px] mt-[20px] mb-[16px]'>
                  <img
                    src={value.profileImgUrl !== null ? value.profileImgUrl : '/assets/images/avatar.svg'}
                    className='w-[24px] h-[24px] rounded-[100%]'
                  />
                  <div className='flex flex-col mt-0.5'>
                    <span className='text-[12px] text-[#717275] leading-[120%]'>{value.nickname}</span>
                    <span className='text-[12px] text-[#717275] leading-[120%]'>
                      {changeDataFormat(value.createdAt)}
                    </span>
                  </div>
                </div>
                <div className='w-full ml-[16px] text-[#38393C] text-[14px] leading-[120%] font-Noto mb-[16px]'>
                  <pre className='w-full whitespace-pre-wrap'>{value.content}</pre>
                </div>
                <div>
                  {value.imgUrlList.length >= 1 ? (
                    <img
                      src={value.imgUrlList[0]}
                      alt='reviewImage'
                      className='w-[160px] h-[96px] mb-[20px] ml-[16px] rounded-[4px]'
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div className='w-full h-[2px] border border-[#EDEDED] border-x-0 border-t-0 bg-[#FCFCFC]' />
              </div>
            </>
          ))}
      </section>
    );
  } else {
    return <></>;
  }
};
export default ReviewDetail;
