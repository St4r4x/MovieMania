import React, { useEffect, useState } from "react";

import { capitalizeFirstLetter } from "@/src/utils/common";
import { getAllMovieGenres } from "@/src/data/services/movie-services";

interface ImageByGenre {
	[key: string]: {
		image: string;
	};
}

interface Genre {
	genre_id: number;
	name: string;
	image?: string;
}

const imagesByGenresTable: ImageByGenre = {
	action: { image: "action.png" },
	animation: { image: "animation.webp" },
	aventure: { image: "aventure.jpeg" },
	comédie: { image: "comédie.jpg" },
	documentaire: { image: "documentaire.jpg" },
	drame: { image: "drame.jpg" },
	fantastique: { image: "fantastique.jpg" },
	guerre: { image: "guerre.jpg" },
	histoire: { image: "histoire.jpg" },
	horreur: { image: "horreur.jpg" },
	musique: { image: "musique.jpeg" },
	romance: { image: "romance.webp" },
	scifi: { image: "scifi.jpeg" },
	thriller: { image: "thriller.jpeg" },
	western: { image: "western.jpg" },
	crime: { image: "crime.jpg" },
};

const SelectedGenres = () => {
	const [genres, setGenres] = useState<Genre[]>([]);

	useEffect(() => {
		const fetchGenres = async () => {
			let fetchedGenres: Genre[] = await getAllMovieGenres();
            console.log(fetchedGenres);

			// Associer les genres aux images correspondantes
			fetchedGenres = fetchedGenres.map((genre) => ({
				...genre,
				image: imagesByGenresTable[genre.name.toLowerCase()]?.image,
			}));

			setGenres(fetchedGenres);
		};

		fetchGenres();
	}, []);

	return (
		<>
			{genres.map(({ genre_id, name, image }) => (
				<div
					key={genre_id}
					className="rounded-lg bg-no-repeat bg-cover bg-center cursor-pointer transition-transform transform hover:scale-105 flex justify-center items-center"
					style={{ backgroundImage: `url(/${image})` }}
				>
					<label className="cursor-pointer flex flex-col items-center">
						<input
							type="checkbox"
							className="checkbox absolute hidden peer"
							name="genres"
							value={genre_id}
						/>
						<span className="p-3 sm:p-6 md:p-14 font-bold bg-opacity-50 bg-black rounded-lg md:text-2xl text-center text-white w-40 sm:w-44 lg:w-72 border-transparent border-4 flex-wrap peer-checked:border-primary peer-checked:text-primary">
							{capitalizeFirstLetter(name)}
						</span>
					</label>
				</div>
			))}
		</>
	);
};

export default SelectedGenres;
