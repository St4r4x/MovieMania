"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { registerUserService } from "@/src/data/services/auth-services";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

const genresTable = {
	action: { id: 1, image: "action.png" },
	animation: { id: 2, image: "animation.webp" },
	aventure: { id: 3, image: "aventure.jpeg" },
	comédie: { id: 4, image: "comédie.jpg" },
	documentaire: { id: 5, image: "documentaire.jpg" },
	drame: { id: 6, image: "drame.jpg" },
	fantastique: { id: 7, image: "fantastique.jpg" },
	guerre: { id: 8, image: "guerre.jpg" },
	histoire: { id: 9, image: "histoire.jpg" },
	horreur: { id: 10, image: "horreur.jpg" },
	musique: { id: 11, image: "musique.jpeg" },
	romance: { id: 12, image: "romance.webp" },
	"sci-fi": { id: 13, image: "scifi.jpeg" },
	thriller: { id: 14, image: "thriller.jpeg" },
	western: { id: 15, image: "western.jpg" },
	crime: { id: 16, image: "crime.jpg" },
};

interface PreferencesFormProps {
	onBackClick: () => void;
	formData: FormData | null;
}

export default function PreferencesForm({ onBackClick, formData }: PreferencesFormProps) {
	const router = useRouter();

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const secondFormData = new FormData(e.currentTarget);
		const genres = secondFormData.getAll("genres").map(Number) as number[];

		if (genres.length < 3) {
			alert("Veuillez sélectionner au moins trois genres.");
			return;
		}

		if (!formData) {
			alert("Données du formulaire précédent manquantes.");
			return;
		}

		const mergedData = {
			email: formData.get("email"),
			password: formData.get("password"),
			genres,
		};

		try {
			await registerUserService(mergedData);
			router.push("/login");
		} catch (error) {
			alert("Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.");
		}
	};

	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<div className="flex flex-col md:flex-row gap-16 items-center justify-center">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 border-t-2 pt-10 md:pt-14">
					{Object.entries(genresTable).map(([genre, { id, image }]) => (
						<div
							key={id}
							className="rounded-lg bg-no-repeat bg-cover bg-center cursor-pointer transition-transform transform hover:scale-105 flex justify-center items-center"
							style={{ backgroundImage: `url(/${image})` }}
						>
							<label className="cursor-pointer flex flex-col items-center">
								<input
									type="checkbox"
									className="checkbox absolute hidden peer"
									name="genres"
									value={id}
								/>
								<span className="p-3 sm:p-6 md:p-14 font-bold bg-opacity-50 bg-black rounded-lg md:text-2xl text-center text-white w-40 sm:w-44 lg:w-72 border-transparent border-4 flex-wrap peer-checked:border-primary peer-checked:text-primary">
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
				<button className="hidden md:block">
					<Image
						src="/chevron-right.png"
						alt="chevron-right"
						width={100}
						height={100}
					/>
				</button>
			</div>
		</form>
	);
}
