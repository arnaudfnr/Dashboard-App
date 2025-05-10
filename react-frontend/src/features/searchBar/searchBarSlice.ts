import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import { fetchClients } from './searchBarAPI';

// Define the state interface
interface SearchBarState {
  query: string;
  results: string[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SearchBarState = {
  query: '',
  results: [],
  loading: false,
  error: null,
};

// Async thunk for fetching search results
export const searchResults = createAsyncThunk<string[], string>(
  'searchBar/searchResults',
  async (query: string) => {
    const response = await fetchClients(query);
    console.log('Response from API:', response.data);
    return response.data;
  }
);

// Create the slice
const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchResults.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

// Export actions and reducer
export const { setQuery } = searchBarSlice.actions;
export const selectSearchBar = (state: RootState) => state.searchBar;
export default searchBarSlice.reducer;