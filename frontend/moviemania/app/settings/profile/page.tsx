"use client";

import React, { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { useFormState } from "react-dom";
import { registerUserAction } from "@/src/data/actions/auth-actions";

const user = {
	nom: "Doe",
	prenom: "John",
	genre: "homme",
	birthday: "2022-01-01",
};

const INITIAL_STATE = {
	data: null,
	zodErrors: null,
	message: null,
};

function SettingsProfile() {
	const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
        setIsLoading(true);
		await formAction(new FormData(event.target as HTMLFormElement));
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
									placeholder="email@exemple.com"
                                    value={user.nom}
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
                                    value={user.prenom}
									type="text"
									autoCorrect="off"
								/>
							</div>
							<div className="grid gap-1">
								<div className="text-gray-300 text-start">Comment vous identifiez-vous?</div>
								<select
									name="genre"
									id="genre"
									className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent"
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
                                    value={user.birthday}
									type="date"
								/>
							</div>
							<Button variant="secondary">{isLoading ? "Mise à jour en cours..." : "Mise à jour"}</Button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}

export default SettingsProfile;
