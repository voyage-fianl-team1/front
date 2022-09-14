import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';
import { PostDataProps, JoinDataProps } from '../../typings';
import { apis } from '../../apis';

export function useGetPostList(postId: number) {
  const { data: res, isLoading } = useQuery([queryKeys.POSTLIST, postId], () => apis.getPostList(postId));
  const postData: PostDataProps = res?.data;
  const drill: JoinDataProps = {
    data: {
      owner: postData?.owner,
      postId: postId,
      player: postData?.player,
      matchStatus: postData?.matchStatus,
      profileUrl: postData?.profileImgUrl,
      nickName: postData?.nickname,
      matchDeadline: postData?.matchDeadline,
      lat: postData?.lat,
      lng: postData?.lng,
      address: postData?.address,
      imgpaths: postData?.imgpaths,
      imgurl: postData?.imgurl,
      imgurls: postData?.imgurls,
      subjectValue: postData?.subjectValue,
      subject: postData?.subject,
      title: postData?.title,
      content: postData?.content,
    },
  };

  return { postData, isLoading, drill };
}
