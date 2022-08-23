import React, { FC, useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { instance } from '../apis';
import SelectSubject from '../components/SelectSubjecet';
import { useDispatch } from 'react-redux';
import { toggleSelectShow } from '../redux/features/selectSlice';
import { RiArrowDownSLine } from 'react-icons/ri';

const SearchMatch: FC = () => {
  const [subject, setSubject] = useState('ALL');
  const [sort, setSort] = useState('default');
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleToggleSelect = useCallback(() => {
    dispatch(toggleSelectShow());
  }, []);

  return (
    <section className=''>
      <span className='flex items-center mt-[16px] mb-[30px]'>
        <div className='flex items-center box-border py-0 px-3 absolute left-5 top-24.5 w-[75px] h-[30px] text-sm text-black bg-white rounded-full border border-matchgi-gray gap-[16px]'>
          <span className='flex flex-row items-center' onClick={handleToggleSelect}>
            전체
            <RiArrowDownSLine className='absolute right-2' />
          </span>
        </div>
        <div className='flex items-center box-border py-0 px-3 absolute left-28 top-24.5 w-[75px] h-[30px] text-sm text-black bg-white rounded-full border border-matchgi-gray gap-[16px]'>
          <span className='flex flex-row items-center'>
            정렬
            <RiArrowDownSLine className='absolute right-2' />
          </span>
        </div>
      </span>
      <div>
        {postList &&
          postList.pages.map((page, index) => (
            <div key={index}>
              {page.data.map((post: any) => (
                <div
                  className='w-full h-20 bg-white p-2'
                  key={post.postId}
                  onClick={() => navigate(`/match/${post.postId}`)}
                  ref={ref}
                >
                  <div className='flex flex-row mb-[28px] items-center'>
                    <img
                      src={post.imgUrl}
                      alt='NOIMG'
                      className='box-border rounded-lg bg-matchgi-lightgray w-16 h-16 border boder-#DCDDE0'
                    ></img>
                    <span className='flex flex-col justify-center ml-4 gap-[1px]'>
                      <div className='text-[16px] font-normal leading-normal text-matchgi-black'>{post.title}</div>
                      <div className='text-xs text-matchgi-gray leading-normal'>주소</div>
                      <div className='text-xs item-start rounded-lg w-full h-[18px] bg-matchgi-lightgray'>
                        {post.subject}
                      </div>
                    </span>
                  </div>
                </div>
              ))}
              {isFetchingNextPage ? <h1>loading...</h1> : <div ref={ref} />}
            </div>
          ))}
      </div>
      <SelectSubject />
    </section>
  );
};
export default SearchMatch;
