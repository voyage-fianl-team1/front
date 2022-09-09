import React, { FC } from 'react';
import SearchBar from '../../components/Match/SearchBar';
import SlideBanner from '../../components/Common/SlideBanner';
import SubTitle from '../../components/Common/SubTitle';
import Header from '../../components/Common/Header';
import CategoryList from '../../components/Common/CategoryList';
import ShowMoreMatchesButton from '../../components/Match/ShowMoreMatchesButton';
import SelectCategory from '../../components/Select/SelectCategory';
import UserRankingList from '../../components/User/UserRankingList';
import WriteFloatingButton from '../../components/Common/WriteFloatingButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Helmet } from 'react-helmet';
import MatchItemList from '../../components/Match/MatchItemList';

const Home: FC = () => {
  const sideMenuShow = useSelector((state: RootState) => state.common.sideMenuShow);
  return (
    <>
      <Helmet>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <title>매치기 | 스포츠를 함께 즐길 매칭상대를 찾아보세요! </title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <meta name='매치기' content='스포츠를 함께 즐길 매칭상대를 찾아보세요!' />
      </Helmet>
      <main>
        <Header />
        <SearchBar />
        <SlideBanner />
        <SubTitle>종목별 경기 보기</SubTitle>
        <CategoryList />
        <SubTitle rightMenu={<ShowMoreMatchesButton />}>최신 경기 목록</SubTitle>
        <MatchItemList />
        <SubTitle rightMenu={<SelectCategory />}>개인 랭킹</SubTitle>
        <UserRankingList />
        {!sideMenuShow && <WriteFloatingButton />}
      </main>
    </>
  );
};

export default Home;
