import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apis } from '../../apis';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../components/loadingSpinner';
import { Helmet } from 'react-helmet';

const Keyword: FC = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const keyword_ = useSelector((state: RootState) => state.keyword);
  const keyword = keyword_['keyword'];

  const fetchsearchList = async (pageParam: number) => {
    const res = await apis.getSearchList(pageParam, keyword);
    const data = res.data.content;
    const last = res.data.last;
    return { data, last, nextPage: pageParam + 1 };
  };

  const {
    data: searchList,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['searchData', keyword], ({ pageParam = 0 }) => fetchsearchList(pageParam), {
    getNextPageParam: (lastPage) => (!lastPage.last ? lastPage.nextPage : undefined),
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (!searchList) {
    return <LoadingSpinner />;
  }
  if (searchList?.pages[0].data.length < 1) {
    return <div className='text-sm text-[#38393C] my-10'>검색 결과가 없습니다.</div>;
  }
  return (
    <>
      <Helmet>
        <title>매치기 | 검색</title>
      </Helmet>
      <div>
        {searchList &&
          searchList.pages.map((page, index) => (
            <div key={index}>
              {page.data.map((post: any) => (
                <div
                  className='w-full h-20 bg-[#FCFCFC] p-2'
                  key={post.postId}
                  onClick={() => navigate(`/match/${post.postId}`)}
                  ref={ref}
                >
                  <div className='flex flex-row mb-[28px] items-center'>
                    {post.imgUrl === null ? (
                      <div className='flex box-border rounded-lg bg-matchgi-lightgray w-16 h-16 border boder-#DCDDE0 justify-center items-center'>
                        <img
                          src={post.imgUrl == null ? '/assets/images/post/noImage.svg' : post.imgUrl}
                          alt='NOIMG'
                          className='w-[36px] h-[36px]'
                        />
                      </div>
                    ) : (
                      <img
                        src={post.imgUrl}
                        alt='NOIMG'
                        className='box-border rounded-lg bg-matchgi-lightgray w-16 h-16 border boder-#DCDDE0'
                      ></img>
                    )}
                    <span className='flex flex-col justify-center ml-4 gap-[1px]'>
                      <div className='text-[16px] font-normal leading-normal text-matchgi-black'>{post.title}</div>
                      <div className='text-xs text-matchgi-gray leading-normal'>주소</div>
                      <div className='flex text-[10px] item-start rounded-lg w-[50px] h-[18px] bg-matchgi-lightgray justify-center p-[0.1rem]'>
                        {post.subject}
                      </div>
                    </span>
                  </div>
                </div>
              ))}
              {isFetchingNextPage ? <LoadingSpinner /> : <div ref={ref} />}
            </div>
          ))}
      </div>
    </>
  );
};
export default Keyword;
