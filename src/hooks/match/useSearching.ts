import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { keywordAction } from '../../redux/features/keywordSlice';

export function useSearching<T>(defaultValue: T) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, getValues } = useForm({});
  const searchingRef = useRef(null);

  const handleSearchingOut = (e: React.MouseEvent) => {
    if (e.target === searchingRef.current) {
      navigate('/');
    }
  };

  const handleKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(keywordAction({ keyword: getValues().keyword }));
      navigate(`/keword`);
    }
  };

  const handleButton = () => {
    dispatch(keywordAction({ keyword: getValues().keyword }));
    navigate(`/keword`);
  };

  return { searchingRef, handleSearchingOut, handleKeyword, handleButton, navigate, register, getValues };
}
