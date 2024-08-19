"use client";

import React from "react";

import ActionButton from "@/src/components/ui/actionsButtons";
import Image from "next/image";
import Modal from "@/src/components/ui/modal";
import { useState } from "react";
import { Movie } from "@/src/types";
import { extractYear, convertMinutesToHours, formatDate } from "@/src/utils/common";

function MovieDetails({ movie }: { movie: Movie }) {
	const [showPopup, setShowPopup] = useState(false);

	const openPopup = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	// Filtre les crédits pour obtenir les acteurs, les réalisateurs et les scénaristes
	const actors = movie.credits.filter((credit) => credit.job.title === "Acting").map((credit) => credit.people.name);
	const directors = movie.credits.filter((credit) => credit.job.title === "Director").map((credit) => credit.people.name);
	const writers = movie.credits.filter((credit) => credit.job.title === "Writer").map((credit) => credit.people.name);

	return (
		<>
			<header className="relative w-full md:h-[90vh] h-96">
				<Image
					src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}original${movie.backdrop_path}`}
					alt="Film Poster"
					layout="fill"
					objectFit="cover"
					quality={100}
					className="border-b-2 border-customBackground"
				/>

				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#22272E]"></div>

				<div className="absolute bottom-0 w-full p-8 text-white">
					<div className="max-w-2xl text-center sm:text-left">
						<h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

						<p className="text-lg font-extralight mb-4">
							{movie.genres[0].name} - Films - {extractYear(movie.release_date)} - {convertMinutesToHours(movie.runtime)}
						</p>

						<div className="flex space-x-4 mb-4 justify-center sm:justify-start">
							<ActionButton
								icon="fa-heart"
								ariaLabel="Like"
							/>

							<ActionButton
								icon="fa-check"
								ariaLabel="Check"
								onClick={() => openPopup()}
							/>
							<ActionButton
								icon="fa-thumbs-down"
								ariaLabel="Dislike"
							/>
						</div>
					</div>
				</div>
				{showPopup && (
					<Modal
						movie={movie}
						onClose={closePopup}
					/>
				)}
			</header>
			<section className="p-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-52">
					{/* Colonne de gauche */}
					<div className="space-y-4">
						<div>
							<h2 className="text-base text-gray-400 mb-2">Synopsis</h2>

							<p className="font-bold">{movie.overview}</p>
						</div>
						<div>
							<h2 className="text-base text-gray-400 mb-2">Distribution</h2>

							<p className="font-bold">{actors.join(", ")}</p>
						</div>
						<div className="flex space-x-3">
							<div>
								<h2 className="text-base text-gray-400 mb-2">Réalisé par</h2>
								<p className="font-bold">{directors.join(", ")}</p>
							</div>
							<div>
								<h2 className="text-base text-gray-400 mb-2">Rédaction</h2>
								<p className="font-bold">{writers.join(", ")}</p>
							</div>
						</div>
					</div>

					{/* Colonne de droite */}
					<div className="space-y-4">
						<div>
							<h2 className="text-base text-gray-400 mb-2">Genres</h2>

							<div className="flex flex-wrap gap-2 ">
								{movie.genres.map((genre) => (
									<span
										key={genre.genre_id}
										className="text-sm bg-gray-700 px-5 py-1 rounded"
									>
										{genre.name}
									</span>
								))}
							</div>
						</div>
						<div>
							<h2 className="text-base text-gray-400 mb-2">Date de sortie</h2>

							<p className="font-bold">{formatDate(movie.release_date)}</p>
						</div>
					</div>
				</div>

				{/* <section className="mt-20">
                        <p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Dans le même genre</p>
    
                        <Carousel movies={movies} />
                    </section> */}

				{/* <section className="mt-20">
                        <p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Nouveautés</p>
    
                        <Carousel movies={movies} />
                    </section> */}
			</section>
		</>
	);
}

export default MovieDetails;
