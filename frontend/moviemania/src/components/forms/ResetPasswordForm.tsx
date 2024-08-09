"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { UpdateUserPassword } from "@/src/data/services/user-services";
import { useSession } from "next-auth/react";

function ResetPasswordForm() {
	const { data: session } = useSession();
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
		await UpdateUserPassword(session, formData);
		setIsLoading(false);
	};

	return (
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
	);
}

export default ResetPasswordForm;
