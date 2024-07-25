"use client";

import React from "react";
import styles from "./PreferencesForm.module.css";

import actionImage from "@/public/action.png";
import { StaticImageData } from "next/image";

type GenreImagePaths = {
    [key: string]: StaticImageData;
  };

const genreImages: GenreImagePaths = {
    action: actionImage,
  };

console.log(genreImages["action"].src);

const genresTable: string[] = [
	"action",
	"animation",
	"aventure",
	"comédie",
	"drame",
	"fantastique",
	"guerre",
	"horreur",
	"romance",
	"sci-fi",
	"thriller",
	"western",
];

const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	const formData = new FormData(e.currentTarget);
	const genres = formData.getAll("genres");
	console.log(genres);
};

export default function PreferencesForm() {
	return (
		<form onSubmit={handleFormSubmit}>
			<div className="flex flex-col gap-5 items-center justify-center">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
					{genresTable.map((genre, index) => (
						<div
							key={index}
							className={`${styles.cat} bg-no-repeat bg-cover bg-center cursor-pointer p-6 border-transparent border-4 transition-transform transform hover:scale-105 active:scale-95 active:shadow-inner flex justify-center items-center`}
							style={{ backgroundImage: `url(${genreImages[genre].src})` }}
						>
							<label className="cursor-pointer flex flex-col items-center">
								<input
									type="checkbox"
									className="checkbox"
									name="genres"
									value={genre}
								/>
								<span className="font-bold bg-opacity-50 bg-black rounded text-center text-white w-52 flex-wrap">{genre}</span>
							</label>
						</div>
					))}
				</div>

				<button
					type="submit"
					className="bg-primary text-white rounded-md px-4 py-2"
				>
					Enregistrer
				</button>
			</div>
		</form>
	);
}
