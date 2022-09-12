import { useQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import { queryKeys } from '../../shared/constant/queryKeys';
import { AxiosResponse } from 'axios';
import { UserRequest } from '../../typings';

interface ResponseType {
  mymatchList: UserRequest[];
}

function useUserRequests() {
  return useQuery([queryKeys.USER_REQUESTS], apis.getUserRequests, {
    select: (res: AxiosResponse<ResponseType>) => res.data.mymatchList,
  });
}

export default useUserRequests;
