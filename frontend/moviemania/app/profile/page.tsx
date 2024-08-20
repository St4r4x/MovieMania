import React from "react";

import styles from "./Profile.module.css";
import profileBackground from "@/public/profile-background.png";
import ProfileDetails from "@/src/components/profile/ProfileDetails";
import Carousel from "@/src/components/ui/carousel";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserProfile, getMovieUser } from "@/src/data/services/user-services";
import { getHydratedMedia } from "@/src/data/services/movie-services";
import { MovieUserProps } from "@/src/types";

export const metadata: Metadata = {
	title: "Mon profil - MovieMania",
};

const Profile = async () => {
	const session = await getServerSession(authOptions);
	const [user, userMovies] = await Promise.all([getUserProfile(session), getMovieUser(session)]);
	const userMovieDetails = await getHydratedMedia(userMovies);

	// Filtre les films
	const ratedMovies = userMovieDetails.filter((movie: MovieUserProps) => movie.note > 0);
	const savedMovies = userMovieDetails.filter((movie: MovieUserProps) => movie.saved);

	return (
		<main className="flex flex-col min-h-screen gap-7">
			<div
				className={`${styles.background} w-full bg-no-repeat bg-cover bg-center items-end flex p-5 md:p-7 h-80 md:h-500`}
				style={{ backgroundImage: `url(${profileBackground?.src})` }}
			>
				<ProfileDetails
					user={user}
					movieuser={userMovies}
					enriched={true}
				/>
			</div>
			<section className="px-5 md:p-8">
				<p className="text-white text-xl inline-block border-b-2 border-white pb-1 mb-3">Récemment noté</p>
				{ratedMovies.length === 0 ? (
					<p className="text-white text-lg">Vous n'avez pas encore noté de films.</p>
				) : (
					<Carousel movies={ratedMovies} />
				)}
			</section>

			<section className="px-5 md:p-8">
				<p className="text-white text-xl inline-block border-b-2 border-white pb-1 mb-3">Récemment sauvegardé</p>
				{savedMovies.length === 0 ? (
					<p className="text-white text-lg">Vous n'avez pas encore sauvegardé de films.</p>
				) : (
					<Carousel movies={savedMovies} />
				)}
			</section>
		</main>
	);
};

export default Profile;
