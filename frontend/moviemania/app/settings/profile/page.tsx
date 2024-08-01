"use client";

import React, { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { patchUserProfile } from "@/src/data/services/user-services";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Paramètres de profil",
};

const user = {
	nom: "Doe",
	prenom: "John",
	sexe: "non-binary",
	birthday: "2022-01-01",
};

function SettingsProfile() {
	const [formData, setFormData] = useState({
		nom: user.nom,
		prenom: user.prenom,
		sexe: user.sexe,
		birthday: user.birthday
	});
	const [isLoading, setIsLoading] = useState(false);
	const [isModified, setIsModified] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setIsModified(true);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		console.log("formData", formData);
		await patchUserProfile(formData);
		setIsLoading(false);

	};

	return (
		<main className="flex flex-col items-center justify-center min-h-screen">
			<div className="bg-gray-700 rounded-md p-10 flex flex-col gap-10 w-1/3">
				<div className="flex justify-center">
					<div className="rounded-full w-28 h-28 bg-purple-400"></div>
				</div>
				<div className={cn("grid gap-6")}>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-5">
							<div className="grid gap-1">
								<div className="text-gray-300 text-start">Nom</div>
								<input
									className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent"
									id="nom"
									name="nom"
									placeholder="nom"
									defaultValue={user.nom}
									onChange={handleChange}
									type="text"
									autoCorrect="off"
								/>
							</div>
							<div className="grid gap-1">
								<div className="text-gray-300 text-start">Prénom</div>
								<input
									className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent"
									id="prenom"
									name="prenom"
									placeholder="prénom"
									defaultValue={user.prenom}
									onChange={handleChange}
									type="text"
									autoCorrect="off"
								/>
							</div>
							<div className="grid gap-1">
								<div className="text-gray-300 text-start">Comment vous identifiez-vous?</div>
								<select
									name="sexe"
									id="sexe"
									className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent"
									defaultValue={user.sexe}
									onChange={handleChange}
								>
									<option value="homme">Homme</option>
									<option value="femme">Femme</option>
									<option value="non-binary">Non-binaire</option>
									<option value="table">Table</option>
								</select>
							</div>
							<div className="grid gap-1">
								<div className="text-gray-300 text-start">Date d'anniversaire</div>
								<input
									className="p-3 border border-gray-300 rounded-md bg-transparent text-gray-300"
									id="birthday"
									name="birthday"
									placeholder=""
									defaultValue={user.birthday}
									onChange={handleChange}
									type="date"
								/>
							</div>
							<Button
								variant="secondary"
								type="submit"
								disabled={isLoading || !isModified}
							>
								{isLoading ? "Mise à jour en cours..." : "Mise à jour"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}

export default SettingsProfile;
