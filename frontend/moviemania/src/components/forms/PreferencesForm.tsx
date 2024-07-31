"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { StaticImageData } from "next/image";
import Chevron from "@/public/chevron-right.png";
import Image from "next/image";
import { postGenresUser } from "@/src/data/services/user-services";

import actionImage from "@/public/action.png";
import animationImage from "@/public/animation.webp";
import aventureImage from "@/public/aventure.jpeg";
import comedieImage from "@/public/comédie.jpg";
import documentaireImage from "@/public/documentaire.jpg";
import drameImage from "@/public/drame.jpg";
import fantastiqueImage from "@/public/fantastique.jpg";
import guerreImage from "@/public/guerre.jpg";
import histoireImage from "@/public/histoire.jpg";
import horreurImage from "@/public/horreur.jpg";
import musiqueImage from "@/public/musique.jpeg";
import romanceImage from "@/public/romance.webp";
import scifiImage from "@/public/scifi.jpeg";
import thrillerImage from "@/public/thriller.jpeg";
import westernImage from "@/public/western.jpg";
import crimeImage from "@/public/crime.jpg";


type GenreImagePaths = {
	[key: string]: StaticImageData;
};

const genreImages: GenreImagePaths = {
	action: actionImage,
	aventure: aventureImage,
	animation: animationImage,
	comédie: comedieImage,
	documentaire: documentaireImage,
	drame: drameImage,
	fantastique: fantastiqueImage,
	guerre: guerreImage,
	histoire: histoireImage,
	horreur: horreurImage,
	musique: musiqueImage,
	romance: romanceImage,
	"sci-fi": scifiImage,
	thriller: thrillerImage,
	western: westernImage,
	crime: crimeImage,
};

const genresTable = {
	"action": 1,
	"animation": 2,
	"aventure": 3,
	"comédie": 4,
	"crime": 5,
	"documentaire": 6,
	"drame": 7,
	"fantastique": 8,
	"guerre": 9,
	"histoire": 10,
	"horreur": 11,
	"musique": 12,
	"romance": 13,
	"sci-fi": 14,
	"thriller": 15,
	"western": 16,
};

const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	const formData = new FormData(e.currentTarget);
	const genres = formData.getAll("genres") as string[];

	if (genres.length === 0 || genres.length < 3) {
		alert("Veuillez sélectionner au moins trois genre.");
		return;
	}

	await postGenresUser(genres);
};

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export default function PreferencesForm() {
	return (
		<form onSubmit={handleFormSubmit}>
			<div className="flex flex-col md:flex-row gap-16 items-center justify-center">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 border-t-2 pt-10 md:pt-14">
					{Object.entries(genresTable).map(([genre, id]) => (
						<div
							key={id}
							className={`rounded-lg bg-no-repeat bg-cover bg-center cursor-pointer transition-transform transform hover:scale-105 flex justify-center items-center`}
							style={{ backgroundImage: `url(${genreImages[genre]?.src})` }}
						>
							<label className="cursor-pointer flex flex-col items-center">
								<input
									type="checkbox"
									className="checkbox absolute hidden peer"
									name="genres"
									value={id}
								/>
								<span className="p-3 sm:p-6 md:p-16 font-bold bg-opacity-50 bg-black rounded-lg md:text-2xl text-center text-white w-40 sm:w-44 lg:w-72 border-transparent border-4 flex-wrap peer-checked:border-primary peer-checked:text-primary">
									{capitalizeFirstLetter(genre)}
								</span>
							</label>
						</div>
					))}
				</div>
				<Button
					className="w-full md:hidden"
					type="submit"
				>
					Enregistrer
				</Button>
				<button
					className="hidden md:block"
				>
					<Image src={Chevron} alt="chevron-right" width={100}/>
				</button>
			</div>
		</form>
	);
}
