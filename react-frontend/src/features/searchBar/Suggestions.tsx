import styles from './SearchBar.module.css';
import Client from '../../models/client';

interface SuggestionsProps {
    suggestionList: Client[];
    onSuggestionClick: (suggestion: string) => void;
}

const MAX_SUGGESTION_NB = 10;

export function Suggestions({ suggestionList: results, onSuggestionClick }: SuggestionsProps) {
    return (
        <ul className={styles['suggestions']}>
            {results.slice(0, MAX_SUGGESTION_NB).map((result, index) => (
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