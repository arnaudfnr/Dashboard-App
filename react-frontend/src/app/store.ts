import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchBarReducer from '../features/searchBar/searchBarSlice';
import clientTableReducer from '../features/clientTable/clientTableSlice';

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    clientTable: clientTableReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
