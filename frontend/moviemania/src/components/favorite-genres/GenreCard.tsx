import React, { FC } from "react";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/src/utils/common";
import { Genre } from "@/src/types";

// Composant pour afficher un genre
export const GenreCard: FC<{ genre: Genre }> = ({ genre }) => (
	<div
		key={genre.genre_id}
		className="rounded-lg bg-no-repeat bg-cover bg-center cursor-pointer transition-transform transform hover:scale-105 flex justify-center items-center"
	>
		{genre.image && (
			<Image
				alt={`${genre.name}-genre`}
				src={genre.image.src}
				fill
				style={{ objectFit: "cover" }}
				className="rounded-lg"
			/>
		)}
		<label className="cursor-pointer flex flex-col items-center z-50">
			<input
				type="checkbox"
				className="checkbox absolute hidden peer"
				name="genres"
				value={genre.genre_id}
			/>
			<span className="p-3 sm:p-6 md:p-14 font-bold bg-opacity-50 bg-black rounded-lg md:text-2xl text-center text-white w-40 sm:w-44 lg:w-72 border-transparent border-4 flex-wrap peer-checked:border-primary peer-checked:text-primary">
				{capitalizeFirstLetter(genre.name)}
			</span>
		</label>
	</div>
);
