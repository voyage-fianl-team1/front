import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { subjectAction } from '../redux/features/subjectSlice';
import { toggleSubjectShow } from '../redux/features/toggleSlice';

function useCustomSelect() {
  const dispatch = useDispatch();
  const subjectShow = useSelector((state: RootState) => state.toggle.subjectShow);

  const handleSelectData = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(subjectAction({ subject: e.currentTarget.name, value: e.currentTarget.value }));
    dispatch(toggleSubjectShow());
  };

  return { handleSelectData, subjectShow };
}

export default useCustomSelect;
