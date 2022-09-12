import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const now = dayjs().format('YYYY-MM-DD HH:mm');

export function getFromNow(date: string | Date) {
  return dayjs(dayjs(date).add(-1, 's')).fromNow();
}

export function convertDateShort(date: string) {
  return dayjs(date).format('M/DD(ddd)');
}

export function changeDataFormat(date: string) {
  return dayjs(date).format('YYYY.MM.DD.');
}
