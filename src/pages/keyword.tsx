import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apis } from '../apis';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/loadingSpinner';
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
  if (searchList.pages.length < 2) {
    return <div className='text-sm text-black/30 my-10'>검색 결과가 없습니다.</div>;
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
                  className='w-full h-20 mt-4 bg-white'
                  key={post.postId}
                  onClick={() => navigate(`/match/${post.postId}`)}
                  ref={ref}
                >
                  <div className='flex flex-row'>
                    <img
                      src={post.imgUrl}
                      alt='searchImg'
                      className='box-border rounded-lg bg-#F4F5F5 w-20 h-20 border boder-#DCDDE0 bg-#F4F5F5'
                    ></img>
                    <span className='flex flex-col justify-center ml-5 gap-0.5'>
                      <div className='text-xl'>{post.title}</div>
                      <div className='text-sm text-gray-400'>주소</div>
                      <div className='text-xs rounded-lg bg-gray-200 p-1.5'>{post.subject}</div>
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
