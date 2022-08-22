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

const Home: FC = () => {
  return (
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
      <WriteFloatingButton />
    </main>
  );
};

export default Home;
