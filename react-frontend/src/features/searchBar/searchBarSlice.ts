import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Client from '../../models/client';
import { SearchBarState } from './SearchBar';
import { searchClients } from '../../app/axiosClient';

// Initial state
const initialState: SearchBarState = {
  query: '',
  isSearchClicked: false,
  suggestions: [],
  loading: false,
  error: null,
};

// Async thunk for calling backend API and query the client table. 
export const searchResults = createAsyncThunk<Client[], string>(
  'searchBar/searchClient',
  async (query: string) => {
    const response = await searchClients(query);
    console.log('Response from API:', response.data);
    return response.data.results;
  }
);

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setIsSearchClicked: (state, action: PayloadAction<boolean>) => {
      state.isSearchClicked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchResults.pending, (state) => {
        console.log('Fetching search results...');
        state.loading = true;
        state.error = null;
      })
      .addCase(searchResults.fulfilled, (state, action: PayloadAction<Client[]>) => {
        console.log('Search results fetched successfully:', action.payload);
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(searchResults.rejected, (state, action) => {
        console.error('Error fetching search results:', action.error);
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

// Export actions and reducer
export const { setQuery, setError, setIsSearchClicked } = searchBarSlice.actions;
export const selectSearchBar = (state: RootState) => state.searchBar;
export default searchBarSlice.reducer;