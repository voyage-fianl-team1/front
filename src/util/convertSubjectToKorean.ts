import { categories } from '../shared/constant/subjectTable';

export function convertSubjectToKorean(subject: string) {
  return categories.find((c) => c.value === subject)?.title;
}
