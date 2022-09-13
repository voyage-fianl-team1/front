import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { keywordAction } from '../../redux/features/keywordSlice';
import usePush from '../usePush';

export function useSearching<T>(defaultValue: T) {
  const dispatch = useDispatch();
  const { push } = usePush();
  const { register, getValues } = useForm({});
  const searchingRef = useRef(null);

  const handleSearchingOut = (e: React.MouseEvent) => {
    if (e.target === searchingRef.current) {
      push('/');
    }
  };

  const handleKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(keywordAction({ keyword: getValues().keyword }));
      push(`/keword`);
    }
  };

  const handleButton = () => {
    dispatch(keywordAction({ keyword: getValues().keyword }));
    push(`/keword`);
  };

  return { searchingRef, handleSearchingOut, handleKeyword, handleButton, register, getValues, push };
}
