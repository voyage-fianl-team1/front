// import { useRef } from 'react';

// export function useJoin<T>(defaultValue: T) {
//   const matchRef = useRef<HTMLDivElement>(null);
//   const detailRef = useRef<HTMLDivElement>(null);
//   const locationRef = useRef<HTMLDivElement>(null);
//   const reviewRef = useRef<HTMLDivElement>(null);

//   const handleMoveScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const value = e.currentTarget.value;
//     if (value === '1') {
//       matchRef.current?.scrollIntoView({ behavior: 'smooth' });
//     } else if (value === '2') {
//       detailRef.current?.scrollIntoView({ behavior: 'smooth' });
//     } else if (value === '3') {
//       locationRef.current?.scrollIntoView({ behavior: 'smooth' });
//     } else {
//       reviewRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return { matchRef, detailRef, locationRef, reviewRef, handleMoveScroll };
// }

export {};
