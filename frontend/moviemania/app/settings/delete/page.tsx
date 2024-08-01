import Link from "next/link";
import React, { useState } from "react";
import { Metadata } from "next";
import { Button } from "@/src/components/ui/button";
import { deleteUserProfile } from "@/src/data/services/user-services";
import Email from "next-auth/providers/email";

export const metadata: Metadata = {
	title: "Supprimer le compte",
};

const user = {
	email: "john.doe@test.com"
}

function SettingsDelete() {
	const [formData, setFormData] = useState({
		email: "",
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
		await deleteUserProfile(formData);
		setIsLoading(false);
	};
	return (
		<main className="flex flex-col items-center justify-center min-h-screen">
			<div className="bg-gray-700 rounded-md p-10 flex flex-col gap-10 text-center w-1/3">
				<h1 className="text-2xl text-white font-bold">Suppression du compte</h1>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-5">
						<div className="grid gap-1">
							<div className="text-gray-300 text-start">Nom</div>
							<input
								className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent"
								id="email"
								name="email"
								placeholder="Votre email de connexion"
								onChange={handleChange}
								type="email"
								autoCorrect="off"
								autoComplete="email"
							/>
						</div>
						<Button
							variant="secondary"
							type="submit"
							disabled={isLoading || !isModified}
						>
							{isLoading ? "Suppression en cours..." : "Suppression du compte"}
						</Button>
					</div>
				</form>
			</div>
		</main>
	);
}

export default SettingsDelete;
