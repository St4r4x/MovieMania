import React from "react";

import { parseGenreKey } from "@/src/utils/common";
import Carousel from "@/src/components/ui/carousel";
import { MovieRecommendations } from "@/src/types";

function HomeCarousels({ movies }: { movies: MovieRecommendations }) {
	const entries = Object.entries(movies).reverse();

	return (
		<>
			{entries.map(([genre, movies]) => (
				<section className="px-7">
					<p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">{parseGenreKey(genre)}</p>

					<Carousel movies={movies} />
				</section>
			))}
		</>
	);
}

export default HomeCarousels;
