import { useCallback } from 'react';
import { useAppDispatch, useAppSelector, useDebouncedSearch } from '../../app/hooks';
import { setQuery, searchResults, selectSearchBar } from './searchBarSlice';
import styles from './SearchBar.module.css';
import Client from '../../models/client';
import { Suggestions } from './Suggestions';

// Define the state interface
export interface SearchBarState {
  query: string;
  results: Client[];
  loading: boolean;
  error: string | null;
}

export function SearchBar() {
  const dispatch = useAppDispatch();
  const { query, results, loading, error } = useAppSelector(selectSearchBar) as SearchBarState;

  const debouncedSearch = useDebouncedSearch((query: string) => {
    dispatch(searchResults(query));
  }, 300);

  const handleInputChange = (query: string) => {
    dispatch(setQuery(query)); // Met à jour la valeur du champ
    debouncedSearch(query); // Lance la recherche avec délai
  };

  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setQuery(suggestion));
    dispatch(searchResults(suggestion));
  };

  return (
    <div className={styles['search-client']}>
      <div className={styles['search-input']}>
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Numéro client ou nom"
        />
        <button onClick={() => dispatch(searchResults(query))} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
        {error && <p>Error: {error}</p>}
        {results.length > 1 && (
          <Suggestions results={results} onSuggestionClick={handleSuggestionClick} />
        )}
      </div>
    </div>
  );
}