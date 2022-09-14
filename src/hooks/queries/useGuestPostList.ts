import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';
import { PostDataProps, JoinDataProps } from '../../typings';
import { apis } from '../../apis';

export function useGetPostList(postId: number) {
  const { data: res, isLoading } = useQuery([queryKeys.GUESTLIST, postId], () => apis.getforGuestPostList(postId));
  const guestData: PostDataProps = res?.data;

  const drill: JoinDataProps = {
    data: {
      owner: guestData?.owner,
      matchStatus: guestData?.matchStatus,
      postId: postId,
      player: guestData?.player,
      profileUrl: guestData?.profileImgUrl,
      nickName: guestData?.nickname,
      matchDeadline: guestData?.matchDeadline,
      lat: guestData?.lat,
      lng: guestData?.lng,
      address: guestData?.address,
      imgpaths: guestData?.imgpaths,
      imgurls: guestData?.imgurls,
      imgurl: guestData?.imgurl,
      subjectValue: guestData?.subjectValue,
      subject: guestData?.subject,
      title: guestData?.title,
      content: guestData?.content,
    },
  };

  return { guestData, isLoading, drill };
}
