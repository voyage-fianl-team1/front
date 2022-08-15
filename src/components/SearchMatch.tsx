import React, { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const SearchMatch: FC = () => {
  const [subject, setSubject] = useState('null');
  const [sort, setSort] = useState('createAt');
  const { ref, inView } = useInView();

  const fetchPostList = async (pageParam: number) => {
    const res = await axios.get(`http://localhost:8080/api/posts?${pageParam}=&${subject}=&${sort}`);
    const data = res.data.content.postList;
    const Last = res.data.last;
    return { data, Last, nextPage: pageParam + 1 };
  };
  const {
    data: postList,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['postList'], ({ pageParam = 1 }) => fetchPostList(pageParam), {
    getNextPageParam: (lastPage) => (!lastPage.Last ? lastPage.nextPage : undefined),
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const subjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  const sortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <h1 className='flex justify-center'>경기목록</h1>
      <select className='w-full text-center' onChange={subjectChange} required>
        <option value='null'>-종목을 골라주세요-</option>
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
      <section>
        {postList?.pages.map((page, index) => (
          <div key={index}>{page.data.title}</div>
        ))}
      </section>
      {isFetchingNextPage ? 'loading...' : <div ref={ref} />}
    </div>
  );
};
export default SearchMatch;
