import React, { FC, useEffect, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apis } from '../apis';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleSortShow, toggleSelectShow, toggleClear } from '../redux/features/toggleSlice';
import { RiArrowDownSLine } from 'react-icons/ri';
import { categories } from '../util/subjectTable';
import { sortCategories } from '../util/sortTables';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/loadingSpinner';

const SearchMatch: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const sort = useSelector((state: RootState) => state.search.sort);
  const subject = useSelector((state: RootState) => state.search.subject);
  const categoryName = useMemo(() => categories.find((c) => c.value === subject), [subject]);
  const sortName = useMemo(() => sortCategories.find((c) => c.value === sort), [sort]);
  console.log(sort);
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
      <section>
        <span className='w-full h-full flex items-center mt-[16px] mb-[30px] gap-5'>
          <div className='flex items-center box-border px-3 w-[99px] h-[38px] text-sm text-black bg-white rounded-full border border-matchgi-gray gap-[16px]'>
            <button className='flex flex-row items-center cursor-pointer' onClick={handleToggleSelect}>
              <p className='w-[50px]'>{categoryName ? categoryName.title : ''}</p>
              <RiArrowDownSLine className='w-[25px]' />
            </button>
          </div>
          <div className='flex items-center box-border px-3 w-[99px] h-[38px] text-sm text-black bg-white rounded-full border border-matchgi-gray gap-[16px]'>
            <button className='flex flex-row items-center cursor-pointer' onClick={handleToggleSort}>
              <p className='w-[50px]'>{sortName ? sortName.title : ''}</p>
              <RiArrowDownSLine className='w-[25px]' />
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
                        <div className='flex text-[10px] srounded-lg w-[50px] h-[18px] bg-matchgi-lightgray justify-center p-[0.2rem] font-Noto'>
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
