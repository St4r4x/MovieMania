"use client";

import React from "react";
import styles from "./PreferencesForm.module.css";
import { Button } from "@/components/ui/button";
import { StaticImageData } from "next/image";
import Chevron from "@/public/chevron-right.png";
import Image from "next/image";
import { postGenresUser } from "@/utils/local_api/usersApi";

import actionImage from "@/public/action.png";

type GenreImagePaths = {
	[key: string]: StaticImageData;
};

const genreImages: GenreImagePaths = {
	action: actionImage,
};

const genresTable = {
	"action": 1,
	"animation": 2,
	"aventure": 3,
	"comédie": 4,
	"drame": 5,
	"fantastique": 6,
	"guerre": 7,
	"horreur": 8,
	"romance": 9,
	"sci-fi": 10,
	"thriller": 11,
	"western": 12,
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
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 border-t-2 pt-10 md:pt-14">
					{Object.entries(genresTable).map(([genre, id]) => (
						<div
							key={id}
							className={`${styles.cat} rounded-lg bg-no-repeat bg-cover bg-center cursor-pointer transition-transform transform hover:scale-105 flex justify-center items-center`}
							style={{ backgroundImage: `url(${genreImages[genre]?.src})` }}
						>
							<label className="cursor-pointer flex flex-col items-center">
								<input
									type="checkbox"
									className="checkbox absolute hidden peer"
									name="genres"
									value={id}
								/>
								<span className="p-3 sm:p-6 md:p-16 font-bold bg-opacity-50 bg-black rounded-lg md:text-2xl text-center text-white w-40 sm:w-44 md:w-56 lg:w-96 border-transparent border-4 flex-wrap peer-checked:border-primary peer-checked:text-primary">
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
