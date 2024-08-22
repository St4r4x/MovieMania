"use client";

import React from "react";

import { Button } from "@/src/components/ui/button";
import Carousel from "@/src/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/src/components/ui/loader";
import { Suspense, useState, useEffect } from "react";
import { MovieRecommendationsDictionary, Movie } from "@/src/types";
import HomeCarousels from "@/src/components/home/HomeCarousels";
import { extractYear, convertMinutesToHours, truncateText } from "@/src/utils/common";

function HomeContent({ movies, headliner }: { movies: MovieRecommendationsDictionary; headliner: Movie }) {
	///////////////Décommenter pour activer le loader////////////////

	const [loading, setLoading] = useState(true);

	// const promise = new Promise((resolve) => {
	// 	setTimeout(resolve, 5000); // Temps aléatoire pour simuler un appel d'API plus ou moins long
	// });

	// useEffect(() => {
	// 	promise.then(() => {
	// 		setLoading(false);
	// 	});
	// }, []);

	// if (loading) {
	// 	return <Loader />;
	// }

	return (
		<Suspense fallback={<Loader />}>
			<header className="relative w-full h-96 md:h-[90vh]">
				<Image
					className="border-b-2 border-customBackground md:border-none"
					src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}original${headliner.backdrop_path}`}
					alt={`Affiche ${headliner.title}`}
					fill
					style={{ objectFit: "cover" }}
					quality={100}
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#22272E] md:bg-gradient-to-r md:from-black md:to-[rgba(0,0,0,0.2)]"></div>

				<div className="absolute inset-0 flex flex-col justify-center md:p-8 text-white">
					<div className="w-full md:w-1/2 h-full flex flex-col justify-end md:justify-center items-center text-center">
						<h1 className="text-3xl md:text-4xl font-bold md:mb-4">{headliner.title}</h1>

						<p className="text-lg max-w-md font-extralight">
							{headliner.genres[0].name} - Films - {extractYear(headliner.release_date)} - {convertMinutesToHours(headliner.runtime)}
						</p>
						<p className="text-xl max-w-md hidden md:block">{truncateText(headliner.overview, 130)}</p>
						<Link href={`/movie/${headliner.movie_id}`}>
							<Button className="rounded-full w-30 text-base mt-4">Plus d'info</Button>
						</Link>
					</div>
				</div>
			</header>
			<div className="flex flex-col gap-12">
				<HomeCarousels movies={movies} />
			</div>
		</Suspense>
	);
}

export default HomeContent;
