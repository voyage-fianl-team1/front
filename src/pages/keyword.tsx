import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { instance } from '../apis';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const Keyword: FC = () => {
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const keyword_ = useSelector((state: RootState) => state.keyword);
  const keyword = keyword_['keyword'];
  const fetchsearchList = async (pageParam: number) => {
    const res = await instance.get(`/api/posts/search?page=${pageParam}&size=20&search=${keyword}`);
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

  return (
    <>
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
              {isFetchingNextPage ? <h1>loading...</h1> : <div ref={ref} />}
            </div>
          ))}
      </div>
    </>
  );
};
export default Keyword;
