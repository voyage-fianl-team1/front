import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

export function useUtil<T>(defaultValue: T) {
  const param = useParams();
  const postId = Number(param.id);
  const url = window.location.href;
  const nowDate = dayjs(new Date()).format('YYYY-MM-DD');

  return { postId, url, nowDate };
}
