import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SearchContextProps {
	query: string;
	setQuery: (query: string) => void;
	data: any[];
	loading: boolean;
	error: string | null;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
	const [query, setQuery] = useState('');
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fakeData = [
		"2",
		"1080",
		"&c",
		"10-point",
		"10th",
	]
	useEffect(() => {
		if (query.trim() === '') {
			setData([]);
			return;
		}

		const fetchData = async () => {
			setLoading(true);
			setError(null);
			console.log('query', query);
			try {
				// const response = await fetch(`http://localhost:5000/search?q=${query}`);
				// if (!response.ok) {
				// 	throw new Error('Network response was not ok');
				// }
				// const data = await response.json();
				console.log('data', fakeData);
				setData(fakeData);
			} catch (err) {
				setError('Failed to fetch data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [query]);

	return (
		<SearchContext.Provider value={{ query, setQuery, data, loading, error }}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error('useSearchContext must be used within a SearchProvider');
	}
	return context;
};