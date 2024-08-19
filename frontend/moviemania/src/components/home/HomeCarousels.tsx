import React from "react";

import { parseGenreKey } from "@/src/utils/common";
import Carousel from "@/src/components/ui/carousel";
import { MovieRecommendationsDictionary } from "@/src/types";

function HomeCarousels({ movies }: { movies: MovieRecommendationsDictionary }) {
	const entries = Object.entries(movies).reverse();

	return (
		<>
			{entries.map(([genre, movies], index) => (
				<section
					className="px-7"
					key={index}
				>
					<p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">{parseGenreKey(genre)}</p>

					<Carousel movies={movies} />
				</section>
			))}
		</>
	);
}

export default HomeCarousels;
