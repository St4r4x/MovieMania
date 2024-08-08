"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { patchUserProfile } from "@/src/data/services/user-services";
import { useSession } from "next-auth/react";

function ProfileForm({ user }: any) {
	const { data: session } = useSession();

	const [formData, setFormData] = useState({});
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
		await patchUserProfile(session, formData);
		setIsLoading(false);
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="grid gap-5">
				<div className="grid gap-1">
					<div className="text-gray-300 text-start">Nom</div>
					<input
						className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent focus:border-primary focus:outline-none"
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
						className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent focus:border-primary focus:outline-none"
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
					<div className="text-gray-300 text-start">Email</div>
					<input
						className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent focus:border-primary focus:outline-none"
						id="email"
						name="email"
						placeholder="email"
						defaultValue={user.email}
						onChange={handleChange}
						type="email"
						autoCorrect="off"
					/>
				</div>
				<div className="grid gap-1">
					<div className="text-gray-300 text-start">Comment vous identifiez-vous?</div>
					<select
						name="sexe"
						id="sexe"
						className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent focus:border-primary focus:outline-none"
						defaultValue={user.sexe}
						onChange={handleChange}
					>
						<option
							className="bg-gray-700"
							value="homme"
						>
							Homme
						</option>
						<option
							className="bg-gray-700"
							value="femme"
						>
							Femme
						</option>
						<option
							className="bg-gray-700"
							value="non-binary"
						>
							Non-binaire
						</option>
						<option
							className="bg-gray-700"
							value="table"
						>
							Table
						</option>
					</select>
				</div>
				<div className="grid gap-1">
					<div className="text-gray-300 text-start">Date d'anniversaire</div>
					<input
						className="p-3 border border-gray-300 rounded-md bg-transparent text-gray-300 focus:border-primary focus:outline-none"
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
	);
}

export default ProfileForm;
