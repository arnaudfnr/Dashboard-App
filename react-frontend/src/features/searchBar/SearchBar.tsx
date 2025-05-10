import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, searchResults, selectSearchBar } from './searchBarSlice';
import styles from './SearchBar.module.css';
import { Client } from '../../models/client';

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

  const handleSearch = () => {
    dispatch(searchResults(query));
  };

  return (
    <div className={styles['search-client']}>
      <div className={styles['search-input']}>
        <input
          type="text"
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          placeholder="Numéro client ou nom"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
        {error && <p>Error: {error}</p>}
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result.full_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}