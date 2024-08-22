import Image from "next/image";
import Link from "next/link";
import React from "react";

import { MovieSearchResultsProps } from "@/src/types";
import { extractYear } from "@/src/utils/common";

const MovieSearchResults: React.FC<MovieSearchResultsProps> = ({ movieResults, onSelectMovie }) => {
	return (
		<div className="w-full rounded-lg border border-1 border-gray-600 absolute z-50 bg-[#1F2937] top-11 p-2.5 shadow-md font-Nunito">
			{movieResults.map((movie) => (
				<>
					<Link
						href={`/movie/${movie.movie_id}`}
						onMouseDown={(e) => e.preventDefault()}
						onClick={onSelectMovie}
						className="flex items-center p-2.5 hover:bg-gray-700 rounded-lg"
						key={movie.movie_id}
					>
						<Image
							width={40}
							height={40}
							src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}w500/${movie.poster_path}`}
							alt={movie.title}
							className="shadow-md"
							priority
						/>
						<div className="ml-3 flex flex-col">
							<h3 className="text-md font-semibold text-gray-300">{movie.title}</h3>
							<div className="text-gray-400 text-sm">
								<span>Film</span>
								<span className="text-gray-600"> • </span>
								<span>{extractYear(movie.release_date)}</span>
							</div>
						</div>
					</Link>
				</>
			))}
		</div>
	);
};

export default MovieSearchResults;
