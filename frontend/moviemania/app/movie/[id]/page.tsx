import React from "react";

import Carousel from "@/src/components/ui/carousel";
import Image from "next/image";
import MovieDetails from "@/src/components/movie-details/MovieDetails";
import { getMovieDetails } from "@/src/data/services/movie-services";

export default async function Movie({ params: { id } }: { params: { id: string } }) {
	const movie = await getMovieDetails(id);

	return (
		<main className="min-h-screen text-white">
			<MovieDetails movie={movie} />
		</main>
	);
}
