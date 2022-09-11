import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

/**
 * 포커스가 될때 callback을 실행합니다 (ref 가 아님에 주의하세요)
 * @param callback
 */

function useFocus(callback: any) {
  const navigate = useNavigate();
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = useCallback(() => {
    callback && callback();
    setIsFocus(true);
  }, []);

  const handleFocusOut = useCallback(() => {
    setIsFocus(false);
  }, []);

  return {
    isFocus,
    handleFocus,
    handleFocusOut,
  };
}

export default useFocus;
