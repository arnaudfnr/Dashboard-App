import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';

// hooks used throughout App
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook for debouncing
export function useDebouncedSearch(callback: (query: string) => void, delay: number) {
  return useCallback(
    debounce((query: string) => {
      callback(query);
    }, delay),
    [callback, delay]
  );
}