import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleSelectShow } from '../redux/features/toggleSlice';
import { subjectSearchShow } from '../redux/features/searchSlice';

function useSelectSubject() {
  const dispatch = useDispatch();
  const selectShow = useSelector((state: RootState) => state.toggle.selectShow);
  const [subject, setSubject] = useState<string>('ALL');
  const handleToggleSelect = useCallback(() => {
    dispatch(toggleSelectShow());
  }, []);

  const handleSelectData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.focus();
    setSubject(e.currentTarget.value);
  };

  const handleSendData = () => {
    dispatch(subjectSearchShow({ subject: subject }));
    dispatch(toggleSelectShow());
  };

  return { selectShow, handleToggleSelect, handleSelectData, handleSendData };
}

export default useSelectSubject;
