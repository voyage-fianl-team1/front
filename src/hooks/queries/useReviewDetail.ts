
// import { useQuery } from '@tanstack/react-query';
// import { apis } from '../../apis';
// import { JoinDataProps } from '../../typings';
// import { AxiosResponse } from 'axios';

// interface PagingResponse {
//   reviewList: JoinDataProps;
// }

// function useReviewDetail(postId: number) {
//   return useQuery(['reviewList'], apis.getReviewList(postId), {
//     select: (res: AxiosResponse<PagingResponse>) => res.data.reviewList,
//   });
// }

// export default useReviewDetail;

export {};
