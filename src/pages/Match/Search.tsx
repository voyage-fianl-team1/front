import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Helmet } from 'react-helmet';
import { useSearch } from '../../hooks/match/useSearch';
import { useSearchList } from '../../hooks/queries/useSearchList';
import LoadingSpinner from '../../components/Common/loadingSpinner';

const SearchMatch: FC = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const { categoryName, sortName, handleToggleSelect, handleToggleSort, ClearAll } = useSearch('');
  const { fetchNextPage, isFetchingNextPage, postList } = useSearchList('');

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  ClearAll();

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
                    className='w-full h-20 bg-[#FCFCFC] p-2 cursor-pointer'
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
                        <div className='text-[16px] font-normal leading-[150%] text-matchgi-black font-Noto'>
                          {post.title}
                        </div>
                        <div className='text-[12px] text-matchgi-gray leading-[150%] font-Noto mb-[2.5px]'>
                          {post.address}
                        </div>
                        <div className='flex text-[10px] rounded-[4px] min-w-[20px] w-[50px] h-[18px] bg-matchgi-lightgray justify-center p-[0.2rem] font-Noto'>
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
