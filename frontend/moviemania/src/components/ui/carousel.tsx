"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Icons } from "@/src/components/icons/icons";
import { MovieRecommendationsProps, MovieRecommendationsDictionary } from "@/src/types";

const Carousel: React.FC<MovieRecommendationsDictionary> = ({ movies }) => {
	const carouselRef = useRef<HTMLDivElement>(null);

	const handleNext = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollLeft += carouselRef.current.clientWidth / 2;
		}
	};

	const handlePrev = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollLeft -= carouselRef.current.clientWidth / 2;
		}
	};

	return (
		<div className="relative w-full">
			<div
				ref={carouselRef}
				className="flex overflow-x-auto scroll-smooth scrollbar-hide"
			>
				{movies.map((movie: MovieRecommendationsProps, index) => (
					<div
						key={movie.movie_id}
						className={`flex-shrink-0 w-[250px]  ${index === 0 ? "py-2 pe-2" : "p-2"}`}
					>
						<Link href={`/movie/${movie.movie_id}`}>
							<div className="relative rounded-lg md:hover:border-2 md:hover:border-white md:hover:scale-95 transition-transform duration-300 ease-in-out">
								<Image
									src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}w300${movie.backdrop_path}`}
									alt={`Image ${movie.title}`}
									layout="responsive"
									objectFit="cover"
									width={250}
									height={375}
									className="rounded-lg"
								/>
								<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm rounded-b-lg">{movie.title}</div>
								<div className="absolute rounded-lg inset-0 flex items-center justify-center opacity-0 hover:opacity-50 hover:bg-black transition-opacity duration-300 ease-in-out">
									<Icons.arrowRight />
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
			<button
				onClick={handlePrev}
				className="hidden md:flex absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10 items-center justify-center"
			>
				<ChevronLeft size={24} />
			</button>
			<button
				onClick={handleNext}
				className="hidden md:flex absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10 items-center justify-center"
			>
				<ChevronRight size={24} />
			</button>
		</div>
	);
};

export default Carousel;
