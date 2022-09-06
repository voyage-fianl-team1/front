import React, { FC } from 'react';
import SearchBar from '../components/SearchBar';
import SlideBanner from '../components/SlideBanner';
import SubTitle from '../components/SubTitle';
import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import ShowMoreMatchesButton from '../components/ShowMoreMatchesButton';
import LatestMatchList from '../components/LatestMatchList';
import SelectCategory from '../components/SelectCategory';
import UserRankingList from '../components/UserRankingList';
import WriteFloatingButton from '../components/WriteFloatingButton';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Helmet } from 'react-helmet';

const Home: FC = () => {
  const sideMenuShow = useSelector((state: RootState) => state.common.sideMenuShow);
  return (
    <>
      <Helmet>
        <title>매치기 | 스포츠를 함께 즐길 매칭상대를 찾아보세요! </title>
        <meta name='매치기' content='스포츠를 함께 즐길 매칭상대를 찾아보세요!' />
      </Helmet>
      <main>
        <Header />
        <SearchBar />
        <SlideBanner />
        <SubTitle>종목별 경기 보기</SubTitle>
        <CategoryList />
        <SubTitle rightMenu={<ShowMoreMatchesButton />}>최신 경기 목록</SubTitle>
        <LatestMatchList />
        <SubTitle rightMenu={<SelectCategory />}>개인 랭킹</SubTitle>
        <UserRankingList />
        {!sideMenuShow && <WriteFloatingButton />}
      </main>
    </>
  );
};

export default Home;
