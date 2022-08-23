import React, { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { instance } from '../apis';

const SearchMatch: FC = () => {
  const [subject, setSubject] = useState('ALL');
  const [sort, setSort] = useState('default');
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchPostList = async (pageParam: number) => {
    const res = await instance.get(`/api/posts?page=${pageParam}&size=20&subject=${subject}&sort=${sort}`);
    const data = res.data.content;
    const last = res.data.last;
    return { data, last, nextPage: pageParam + 1 };
  };

  const {
    data: postList,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(['postData'], ({ pageParam = 0 }) => fetchPostList(pageParam), {
    getNextPageParam: (lastPage) => (!lastPage.last ? lastPage.nextPage : undefined),
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    refetch();
    queryClient.invalidateQueries(['postData']);
  }, [sort, subject]);

  const handleSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };
  return (
    <>
      <span className='flex flex-row items-center gap-4'>
        <select
          className='block p-2 w-20 text-sm text-black bg-white rounded-2xl border border-#9A9B9F'
          onChange={handleSubject}
          required
        >
          <option value='ALL'>전체</option>
          <option value='SOCCER'>축구</option>
          <option value='BASKETBALL'>농구</option>
          <option value='BADMINTON'>배드민턴</option>
          <option value='BILLIARDS'>당구</option>
          <option value='BOWLING'>볼링</option>
          <option value='TENNIS'>테니스</option>
        </select>
        <select
          className='block p-2 w-20 text-sm text-black bg-white rounded-2xl border border-#9A9B9F'
          onChange={handleSort}
          required
        >
          <option value='default'>정렬</option>
          <option value='viewcount'>조회수순</option>
          <option value='createAt'>최신순</option>
        </select>
      </span>
      <div>
        {postList &&
          postList.pages.map((page, index) => (
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
export default SearchMatch;
