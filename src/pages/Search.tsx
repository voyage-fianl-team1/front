import React, { FC, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apis } from '../apis';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleSortShow, toggleSelectShow, toggleClear } from '../redux/features/toggleSlice';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/loadingSpinner';

const SearchMatch: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const sort = useSelector((state: RootState) => state.search.sort);
  const subject = useSelector((state: RootState) => state.search.subject);
  const fetchPostList = async (pageParam: number) => {
    const res = await apis.getMainPostList(pageParam, subject, sort);
    const data = res.data.content;
    const last = res.data.last;
    return { data, last, nextPage: pageParam + 1 };
  };

  const {
    data: postList,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(['postData', sort, subject], ({ pageParam = 0 }) => fetchPostList(pageParam), {
    getNextPageParam: (lastPage) => (!lastPage.last ? lastPage.nextPage : undefined),
  });

  useEffect(() => {
    refetch();
    queryClient.invalidateQueries(['postData']);
  }, []);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const handleToggleSelect = useCallback(() => {
    dispatch(toggleSelectShow());
  }, []);

  const handleToggleSort = useCallback(() => {
    dispatch(toggleSortShow());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(toggleClear());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>매치기 | 경기목록</title>
      </Helmet>
      <section className=''>
        <span className='flex items-center mt-[16px] mb-[30px]'>
          <div className='flex items-center box-border py-0 px-3 absolute left-5 top-24.5 w-[75px] h-[30px] text-sm text-black bg-white rounded-full border border-matchgi-gray gap-[16px]'>
            <button className='flex flex-row items-center cursor-pointer' onClick={handleToggleSelect}>
              종목
              <RiArrowDownSLine className='absolute right-2' />
            </button>
          </div>
          <div className='flex items-center box-border py-0 px-3 absolute left-28 top-24.5 w-[75px] h-[30px] text-sm text-black bg-white rounded-full border border-matchgi-gray gap-[16px]'>
            <button className='flex flex-row items-center cursor-pointer' onClick={handleToggleSort}>
              정렬
              <RiArrowDownSLine className='absolute right-2' />
            </button>
          </div>
        </span>
        <div>
          {postList &&
            postList.pages.map((page, index) => (
              <div key={index}>
                {page.data.map((post: any) => (
                  <div
                    className='w-full h-20 bg-[#FCFCFC] p-2'
                    key={post.postId}
                    onClick={() => navigate(`/match/${post.postId}`)}
                    ref={ref}
                  >
                    <div className='flex flex-row mb-[28px] items-center'>
                      <img
                        src={post.imgUrl == null ? '/assets/images/post/noImage.svg' : post.imgUrl}
                        alt='NOIMG'
                        className='box-border rounded-lg bg-matchgi-lightgray w-16 h-16 border boder-#DCDDE0'
                      ></img>
                      <span className='flex flex-col justify-center ml-4 gap-[1px]'>
                        <div className='text-[16px] font-normal leading-[150%] text-matchgi-black font-Noto'>
                          {post.title}
                        </div>
                        <div className='text-[12px] text-matchgi-gray leading-[150%] font-Noto mb-[2.5px]'>
                          {post.address}
                        </div>
                        <div className='flex text-[10px] item-start rounded-lg w-[40px] h-[18px] bg-matchgi-lightgray justify-center p-[0.1rem] font-Noto'>
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
      </section>
    </>
  );
};
export default SearchMatch;
