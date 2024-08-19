import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import HomeContent from "@/src/components/home/HomeContent";
import { getMoviesRecommendations } from "@/src/data/services/movie-services";

export const metadata: Metadata = {
	title: "MovieMania - Recommandations de films et plus",
};

export default async function Home() {
	const session = await getServerSession(authOptions);
	const movieRecommendations = await getMoviesRecommendations(session);
	
	return (
		<main className="min-h-screen flex flex-col gap-12">
			<HomeContent movies={movieRecommendations}/>
		</main>
	);
}
