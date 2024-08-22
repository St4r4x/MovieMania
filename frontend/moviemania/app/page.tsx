import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

import HomeContent from "@/src/components/home/HomeContent";
import { getMoviesRecommendations, getMovieDetails } from "@/src/data/services/movie-services";

export const metadata: Metadata = {
	title: "MovieMania - Recommandations de films et plus",
};

export default async function Home() {
	const session = await getServerSession(authOptions);
	const movieRecommendations = await getMoviesRecommendations(session);

	// Débogage : Afficher les données reçues
	console.log("Données reçues pour les recommandations :", movieRecommendations);

	// Vérification que movieRecommendations et trending_carousel existent
	if (!movieRecommendations || !movieRecommendations.trending_carousel || movieRecommendations.trending_carousel.length === 0) {
		// Gérer le cas où les données ne sont pas disponibles
		console.error("Les recommandations de films ou le carousel sont manquants");
		return (
			<main className="min-h-screen flex flex-col gap-12">
				<p>Aucune recommandation disponible pour le moment.</p>
			</main>
		);
	}

	const firstTrendingMovie = movieRecommendations.trending_carousel[0];
	const firstTrendingMovieDetails = await getMovieDetails(firstTrendingMovie.movie_id);

	return (
		<main className="min-h-screen flex flex-col gap-12">
			<HomeContent
				movies={movieRecommendations}
				headliner={firstTrendingMovieDetails}
			/>
		</main>
	);
}
