import React from "react";
import profileBackground from "@/public/profile-background.png";
import styles from "../Profile.module.css";
import ProfileDetails from "@/src/components/profile/ProfileDetails";
import ProfileMediaCard from "@/src/components/profile/ProfileMediaCard";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserProfile, getMovieUser } from "@/src/data/services/user-services";
import { getHydratedMedia } from "@/src/data/services/movie-services";
import { MovieUserProps, Movie } from "@/src/types";

export const metadata: Metadata = {
	title: "Mes Films notés",
};

async function MediaUserRatings() {
	const session = await getServerSession(authOptions);
	const user = await getUserProfile(session);

	const userMovies = await getMovieUser(session);
	const userMovieDetails = await getHydratedMedia(userMovies);

	// Filtre les films
	const ratedMovies = userMovieDetails.filter((movie: MovieUserProps) => movie.note > 0);

	return (
		<main className="flex flex-col min-h-screen w-full gap-7">
			<div
				className={`${styles.background} w-full bg-no-repeat bg-cover bg-center items-end flex p-5 md:p-7 h-80 md:h-500`}
				style={{ backgroundImage: `url(${profileBackground?.src})` }}
			>
				<ProfileDetails
					user={user}
					enriched={false}
					page="Mes films notés"
				/>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 px-6 md:p-10 gap-4 md:gap-10 items-center justify-center">
				{ratedMovies.map((ratedMovie: Movie) => (
					<ProfileMediaCard
						key={ratedMovie.movie_id}
						media={ratedMovie}
						origin="ratings"
					/>
				))}
			</div>
		</main>
	);
}

export default MediaUserRatings;
