"use client";

import React, { useEffect, useState, FC } from "react";
import { getMovieGenres } from "@/app/api/movie-genres/getMovieGenres";
import { Genre, ImageByGenre } from "@/src/types";
import { GenreCard } from "@/src/components/favorite-genres/GenreCard";

// Importation des images
import actionImg from "@/public/action.png";
import animationImg from "@/public/animation.webp";
import aventureImg from "@/public/aventure.jpeg";
import comedieImg from "@/public/comédie.jpg";
import documentaireImg from "@/public/documentaire.jpg";
import drameImg from "@/public/drame.jpg";
import fantastiqueImg from "@/public/fantastique.jpg";
import guerreImg from "@/public/guerre.jpg";
import histoireImg from "@/public/histoire.jpg";
import horreurImg from "@/public/horreur.jpg";
import musiqueImg from "@/public/musique.jpeg";
import romanceImg from "@/public/romance.webp";
import scifiImg from "@/public/scifi.jpeg";
import thrillerImg from "@/public/thriller.jpeg";
import westernImg from "@/public/western.jpg";
import crimeImg from "@/public/crime.jpg";

// Mapping entre les genres et leurs images
const imagesByGenresTable: ImageByGenre = {
	action: actionImg,
	animation: animationImg,
	aventure: aventureImg,
	comédie: comedieImg,
	documentaire: documentaireImg,
	drame: drameImg,
	fantastique: fantastiqueImg,
	guerre: guerreImg,
	histoire: histoireImg,
	horreur: horreurImg,
	musique: musiqueImg,
	romance: romanceImg,
	"science-fiction": scifiImg,
	thriller: thrillerImg,
	western: westernImg,
	crime: crimeImg,
};

const SelectedGenres: FC = () => {
	const [genres, setGenres] = useState<Genre[]>([]);

	useEffect(() => {
		const fetchGenres = async () => {
			const fetchedGenres = await getMovieGenres();
			const filteredGenres = fetchedGenres.filter((genre: Genre) => !["familial", "mystère", "téléfilm"].includes(genre.name.toLowerCase()));

			// Associer les genres aux images correspondantes
			const genresWithImages = filteredGenres.map((genre: Genre) => ({
				...genre,
				image: imagesByGenresTable[genre.name.toLowerCase()],
			}));

			setGenres(genresWithImages);
		};

		fetchGenres();
	}, []);

	return (
		<>
			{genres.map((genre) => (
				<GenreCard
					key={genre.genre_id}
					genre={genre}
				/>
			))}
		</>
	);
};

export default SelectedGenres;
