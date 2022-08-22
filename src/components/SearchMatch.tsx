import React, { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { instance } from '../apis';

const SearchMatch: FC = () => {
  const [subject, setSubject] = useState('ALL');
  const [sort, setSort] = useState('createAt');
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchPostList = async (pageParam: number) => {
    const res = await instance.get(`/api/posts?page=${pageParam}&size=20&subject=${subject}`);
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

  const subjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };
  const sortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };
  return (
    <>
      <h1 className='flex justify-center'>경기목록</h1>
      <select className='w-full text-center' onChange={subjectChange} required>
        <option value='ALL'>-종목-</option>
        <option value='SOCCER'>축구</option>
        <option value='BASKETBALL'>농구</option>
        <option value='BADMINTON'>배드민턴</option>
        <option value='BILLIARDS'>당구</option>
        <option value='BOWLING'>볼링</option>
        <option value='TENNIS'>테니스</option>
      </select>
      <select className='w-full text-center' onChange={sortChange} required>
        <option value='sort'>-정렬-</option>
        <option value='viewCount'>조회수순</option>
        <option value='createAt'>최신순</option>
        <option value='deadline'>마감일순</option>
      </select>
      <div>
        {postList &&
          postList.pages.map((page, index) => (
            <div key={index}>
              {page.data.map((post: any) => (
                <div
                  className='w-full h-20 mb-2 bg-slate-600 text-white text-5xl '
                  key={post.postId}
                  onClick={() => navigate(`/match/${post.postId}`)}
                  ref={ref}
                >
                  {post.title}
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
