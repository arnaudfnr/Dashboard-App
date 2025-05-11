import { useAppDispatch, useAppSelector, useDebouncedSearch } from '../../app/hooks';
import { setQuery, setError, searchResults, selectSearchBar, setIsSearchClicked } from './searchBarSlice';
import styles from './SearchBar.module.css';
import Client from '../../models/client';
import { Suggestions } from './Suggestions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Define the state interface
export interface SearchBarState {
  query: string;
  isSearchClicked: boolean;
  suggestions: Client[];
  loading: boolean;
  error: string | null;
}

function setQueryString(query: string): string {
  return isNaN(Number(query)) ? `full_name=${query}` : `id=${query}`;
}

export function SearchBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { query, isSearchClicked, suggestions, loading, error } = useAppSelector(selectSearchBar) as SearchBarState;

  const debouncedSearch = useDebouncedSearch((query: string) => {
    dispatch(searchResults(`search=${query}`));
  }, 1000);

  // When the query changes, if the input containsa string, fetch client data in a debounced manner
  useEffect(() => {
    if (isNaN(Number(query))) {
      debouncedSearch(query);
    }
  }, [query]);

  // When the search button is clicked, navigate to the consumption page with the client ID if found unique
  useEffect(() => {
    if (isSearchClicked) {
      if (suggestions.length === 1) {
        const client = suggestions[0];
        navigate(`/consumption/${client.id}`);
      } else if (suggestions.length > 1) {
        dispatch(setError('Multiple results found, select a client from the suggestions'));
      } else {
        dispatch(setError('No results found'));
      }
      dispatch(setIsSearchClicked(false));
    }
  }, [isSearchClicked]);

  return (
    <div className={styles['search-client']}>
      <div className={styles['search-input']}>
        <input
          type="text"
          value={query}
          onChange={(e) => dispatch(setQuery((e.target.value)))}
          placeholder="Numéro client ou nom"
        />
        <button onClick={() => dispatch(setIsSearchClicked(true))} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
        {error && <p>Error: {error}</p>}
        {suggestions.length > 1 && (
          <Suggestions suggestionList={suggestions} onSuggestionClick={(suggestion) => dispatch(setQuery(suggestion))} />
        )}
      </div>
    </div>
  );
}