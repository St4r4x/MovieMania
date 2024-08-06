"use client";

import React, { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { UpdateUserPassword } from "@/src/data/services/user-services";

function ResetPassword() {
	const [formData, setFormData] = useState({
		current_password: "",
		new_password: "",
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
		await UpdateUserPassword(formData);
		setIsLoading(false);
	};

	return (
		<main className="flex flex-col items-center min-h-screen p-5">
			<div className="bg-gray-700 rounded-md p-10 flex flex-col gap-10 w-full sm:w-500">
                <h1 className="text-2xl text-white text-center font-bold">Modifier mot de passe</h1>
				<div className={cn("grid gap-6")}>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-5">
							<div className="grid gap-1">
								<div className="text-gray-300 text-start">Ancien mot de passe</div>
								<input
									className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent focus:border-primary focus:outline-none"
									id="current_password"
									name="current_password"
									placeholder="Saisissez votre ancien mot de passe"
									onChange={handleChange}
									type="password"
									autoCorrect="off"
								/>
							</div>
							<div className="grid gap-1">
								<div className="text-gray-300 text-start">Nouveau mot de passe</div>
								<input
									className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent focus:border-primary focus:outline-none"
									id="new_password"
									name="new_password"
									placeholder="Saisissez votre nouveau mot de passe"
									onChange={handleChange}
									type="password"
									autoCorrect="off"
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

export default ResetPassword;
