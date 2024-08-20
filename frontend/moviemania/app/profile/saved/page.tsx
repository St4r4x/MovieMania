import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

import profileBackground from "@/public/profile-background.png";
import styles from "../Profile.module.css";
import ProfileDetails from "@/src/components/profile/ProfileDetails";
import ProfileMediaCard from "@/src/components/profile/ProfileMediaCard";
import { getUserProfile, getMovieUser } from "@/src/data/services/user-services";
import { getHydratedMedia } from "@/src/data/services/movie-services";
import { MovieUserProps, Movie } from "@/src/types";

export const metadata: Metadata = {
	title: "Mes Films sauvegardés",
};

async function MediaUserSaved() {
	const session = await getServerSession(authOptions);
	const user = await getUserProfile(session);

	const userMovies = await getMovieUser(session);
	const userMovieDetails = await getHydratedMedia(userMovies);

	// Filtre les films
	const savedMovies = userMovieDetails.filter((movie: MovieUserProps) => movie.saved);

	return (
		<main className="flex flex-col min-h-screen w-full gap-7">
			<div
				className={`${styles.background} w-full bg-no-repeat bg-cover bg-center items-end flex p-5 md:p-7 h-80 md:h-500`}
				style={{ backgroundImage: `url(${profileBackground?.src})` }}
			>
				<ProfileDetails
					user={user}
					enriched={false}
					page="Mes films sauvegardés"
				/>
			</div>
			{savedMovies.length > 0 ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 px-6 md:p-10 gap-4 md:gap-10">
					{savedMovies.map((savedMovie: Movie) => (
						<ProfileMediaCard
							key={savedMovie.movie_id}
							media={savedMovie}
							origin="saves"
						/>
					))}
				</div>
			) : (
				<p className="text-white text-lg px-6 md:p-10">Vous n'avez pas encore sauvegardé de films.</p>
			)}
		</main>
	);
}

export default MediaUserSaved;
