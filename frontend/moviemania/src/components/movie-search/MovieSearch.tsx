"use client";

import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import MovieSearchResults from "@/src/components/movie-search/movie-search-results/MovieSearchResults";
import { Movie } from "@/src/types";
import axios from "axios";

const MovieSearch = () => {
	const [movieResults, setMovieResults] = useState<Movie[]>([]);
	const [hasFocus, setHasFocus] = useState(false);
	const [query, setQuery] = useState("");

	const updateMovieSearch = async (query: string) => {
		if (!query) {
			setMovieResults([]);
			return;
		}
		try {
			const response = await axios.get(`/api/movie-search`, {
				params: { query },
			});
			const searchResults = response.data;
			console.log("searchResults", searchResults);
			setMovieResults(searchResults.filter((movie: Movie) => movie.backdrop_path));
		} catch (error) {
			console.error("Error fetching movie data:", error);
			setMovieResults([]);
		}
	};

	const handleSelectMovie = () => {
		setQuery("");
		setMovieResults([]);
		setHasFocus(false);
	};

	return (
		<div className="relative">
			<DebounceInput
				value={query}
				minLength={2}
				debounceTimeout={500}
				onChange={(e) => {
					setQuery(e.target.value);
					updateMovieSearch(e.target.value);
				}}
				placeholder="Rechercher..."
				onBlur={() => setHasFocus(false)}
				onFocus={() => setHasFocus(true)}
				className="w-96 p-2 rounded-lg border border-1 border-gray-600 outline-none bg-gray-700 text-white"
			/>
			{movieResults.length > 0 && hasFocus && (
				<MovieSearchResults
					movieResults={movieResults}
					onSelectMovie={handleSelectMovie}
				/>
			)}
		</div>
	);
};

export default MovieSearch;
