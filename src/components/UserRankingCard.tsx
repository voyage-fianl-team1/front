import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UserRanking } from '../typings';
import { categories } from '../util/subjectTable';

interface Props {
  user: UserRanking;
  rank: number;
}

const UserRankingCard: FC<Props> = ({ user, rank }) => {
  const subjectInfo = useMemo(() => categories.find((c) => c.value === user.subject), [user.subject]);
  return (
    <div className='user-ranking-card flex justify-between items-center p-2'>
      <div className='flex items-center gap-2'>
        <span className='font-bold text-xl min-w-[12px]'>{rank}</span>
        <img
          className='w-[32px] h-[32px] rounded-full'
          src={user.profileUrl ? user.profileUrl : '/assets/images/avatar.svg'}
          alt='user-avatar'
        />
        <Link to={`/matchHistory/${user.userId}/subject/ALL?nickname=${user.nickname}`}>
          <h2>{user.nickname.length > 15 ? user.nickname.slice(0, 16) + '...' : user.nickname}</h2>
        </Link>
      </div>
      <div className='flex items-center gap-2'>
        <span>{user.win}승</span>
        <img
          src={subjectInfo ? subjectInfo.icon : '/assets/images/category/all.svg'}
          alt={user.subject}
          className='w-[24px] h-[24px] object-center'
        />
      </div>
    </div>
  );
};

export default UserRankingCard;
