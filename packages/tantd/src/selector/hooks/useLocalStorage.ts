import { useState, useCallback, useEffect, useRef } from 'react';

export type StorageStateResult<T> = [T, (value?: T) => void];

function windowExist() {
  return typeof window === 'object';
}

export default function useStorageState<T>(
  key: string,
  defaultValue: T,
): StorageStateResult<T> {
  const storage = window.localStorage as Storage;
  const [state, setState] = useState<T>(() => getStoredValue());
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      setState(getStoredValue());
    }
  }, [key]);

  function getStoredValue() {
    const raw = storage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.log(e);
      }
    }
    return defaultValue;
  }

  const updateState = useCallback(
    (value?: T) => {
      if (typeof value === 'undefined') {
        storage.removeItem(key);
        setState(defaultValue);
      } else {
        storage.setItem(key, JSON.stringify(value));
        setState(value);
      }
    },
    [key],
  );

  if (!windowExist()) {
    return [defaultValue, () => {}];
  }

  return [state, updateState];
}
