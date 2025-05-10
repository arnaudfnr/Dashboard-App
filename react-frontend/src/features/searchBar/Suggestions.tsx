import React from 'react';
import styles from './SearchBar.module.css';
import Client from '../../models/client';

interface SuggestionsProps {
    results: Client[];
    onSuggestionClick: (suggestion: string) => void;
}

export function Suggestions({ results, onSuggestionClick }: SuggestionsProps) {
    return (
        <ul className={styles['suggestions']}>
            {results.map((result, index) => (
                <li
                    key={index}
                    onClick={() => onSuggestionClick(result.full_name)}
                    className={styles['suggestion-item']}
                >
                    {result.full_name}
                </li>
            ))}
        </ul>
    );
}