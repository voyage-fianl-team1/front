import { ChangeEvent, useCallback, useState } from 'react';

export function useInput<T>(defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  const reset = useCallback((value = defaultValue) => {
    setValue(value);
  }, []);

  return { value, handler, reset };
}
