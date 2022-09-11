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
