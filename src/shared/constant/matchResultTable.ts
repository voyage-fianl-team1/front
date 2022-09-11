interface MatchResultTable {
  LOSE: {
    text: string;
    color: string;
  };
  WIN: {
    text: string;
    color: string;
  };
  DRAW: {
    text: string;
    color: string;
  };
  [key: string]: {
    text: string;
    color: string;
  };
}

export const matchResultTable: MatchResultTable = {
  LOSE: {
    text: '패',
    color: 'bg-[#717275]',
  },
  WIN: {
    text: '승',
    color: 'bg-[#3341A0]',
  },
  DRAW: {
    text: '무승부',
    color: 'bg-[#C5C6CA] text-black',
  },
};

interface UserRequestStatusTable extends MatchResultTable {
  PENDING: {
    text: string;
    color: string;
  };
  REJECT: {
    text: string;
    color: string;
  };
  ACCEPT: {
    text: string;
    color: string;
  };
  MYMATCH: {
    text: string;
    color: string;
  };
}

export const userRequestStatusTable: UserRequestStatusTable = {
  PENDING: {
    text: '승인 대기중',
    color: 'bg-[#6367CC]',
  },
  REJECT: {
    text: '경기종료',
    color: 'bg-[#9A9B9F]',
  },
  ACCEPT: {
    text: '승인 완료',
    color: 'bg-[#14308B]',
  },
  WIN: {
    text: '승리',
    color: 'bg-white border-[1px] border-[#3341A0] text-black',
  },
  LOSE: {
    text: '패배',
    color: 'bg-white border-[1px] border-[#9A9B9F] text-[#38393C] ',
  },
  DRAW: {
    text: '무승부',
    color: 'bg-white border-[1px] border-[#DCDDE0] text-[#717275] ',
  },
  MYMATCH: {
    text: '내 경기',
    color: 'bg-[#DCDDE0] border-[1px] border-[#9A9B9F] text-black ',
  },
};
