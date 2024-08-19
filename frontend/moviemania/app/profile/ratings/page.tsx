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

const medias = [
	{ id: 1, poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", title: "Test", rating: 5 },
	{ id: 2, poster_path: "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg", title: "Test", rating: 4 },
	{ id: 3, poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg", title: "Test", rating: 1 },
	{ id: 4, poster_path: "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg", title: "Test", rating: 3 },
	{ id: 5, poster_path: "/yrpPYKijwdMHyTGIOd1iK1h0Xno.jpg", title: "Test", rating: 5 },
	{ id: 6, poster_path: "/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg", title: "Test", rating: 2 },
	{ id: 7, poster_path: "/3E53WEZJqP6aM84D8CckXx4pIHw.jpg", title: "Test", rating: 3 },
];

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
