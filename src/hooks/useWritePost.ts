import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { apis } from '../apis';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

function useWritePost() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: RootState) => state.user);

  const handleRewriteCheck = useCallback(async () => {
    if (!isLogin) {
      alert('로그인 후 함께해주세요!');
      return navigate('/splash');
    }
    try {
      await apis.getRewrite();
      navigate('/new');
    } catch (err) {
      if (err && err instanceof AxiosError) {
        alert(err.response?.data);
        navigate('/');
      }
    }
  }, []);

  return { handleRewriteCheck };
}

export default useWritePost;
