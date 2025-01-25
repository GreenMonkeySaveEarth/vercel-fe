import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the context data
interface SearchContextProps {
	query: string;
	setQuery: (query: string) => void;
	suggestions: string[];
	selectedIndex: number;
	setSuggestions: (suggestions: string[]) => void;
	setSelectedIndex: (index: number | ((prevIndex: number) => number)) => void;
	loading: boolean;
	error: string | null;
}

// Create the context with an undefined default value
const SearchContext = createContext<SearchContextProps | undefined>(undefined);

// Provider component to wrap around parts of the app that need access to the search context
export const SearchProvider = ({ children }: { children: ReactNode }) => {
	const [query, setQuery] = useState('');
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Effect to fetch suggestions whenever the query changes
	useEffect(() => {
		if (query.trim() === '') {
			setSuggestions([]);
			return;
		}

		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(`http://localhost:3000/search?query=${query}`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const { suggestions } = await response.json();
				if (suggestions.length === 1 && suggestions[0] === query) {
					// Exact match found, clearing suggestions to show a better UI experience
					setSuggestions([]);
				} else {
					setSuggestions(suggestions);
				}
			} catch (err) {
				setError('Failed to fetch data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [query]);

	return (
		<SearchContext.Provider value={{
			query, setQuery, suggestions, selectedIndex,
			setSuggestions, setSelectedIndex, loading, error
		}}>
			{children}
		</SearchContext.Provider>
	);
};

// Custom hook to use the search context
export const useSearchContext = () => {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error('useSearchContext must be used within a SearchProvider');
	}
	return context;
};