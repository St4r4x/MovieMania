import React from "react";

import Carousel from "@/src/components/ui/carousel";
import MovieDetails from "@/src/components/movie-details/MovieDetails";
import { getMovieDetails } from "@/src/data/services/movie-services";
import { getMovieUserBy } from "@/src/data/services/user-services";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function Movie({ params: { id } }: { params: { id: number } }) {
	const session = await getServerSession(authOptions);
	const movie = await getMovieDetails(id);
	const userMovieProps = await getMovieUserBy(session, id) || {};

	return (
		<main className="min-h-screen text-white">
			<MovieDetails
				movie={movie}
				userMovieProps={userMovieProps}
			/>
			{/* <section className="mt-20">
					<p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Dans le même genre</p>

					<Carousel movies={movies} />
				</section> */}

			{/* <section className="mt-20">
					<p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Nouveautés</p>

					<Carousel movies={movies} />
				</section> */}
		</main>
	);
}
