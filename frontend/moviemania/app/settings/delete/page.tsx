"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { deleteUserProfile } from "@/src/data/services/user-services";
import { useRouter } from "next/navigation";
import { boolean } from "zod";

const user = {
	email: "john@doe.com",
	id: 3,
};

function SettingsDelete() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [isMatched, setIsMatched] = useState(false);

	const handleMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (value === user.email) {
			setIsMatched(true);
		} else {
			setIsMatched(false);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		const result = await deleteUserProfile(user.id);
		if (result?.success) {
			router.push("/signin");
		} else {
			console.error("La suppression a échoué");
		}
		setIsLoading(false);
	};
	return (
		<main className="flex flex-col items-center justify-center min-h-screen">
			<div className="bg-gray-700 rounded-md p-10 flex flex-col gap-10 text-center w-1/3">
				<h1 className="text-2xl text-white font-bold">Suppression du compte</h1>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-5">
						<div className="grid gap-1">
							<div className="text-gray-300 text-start">Email</div>
							<input
								className="text-gray-300 p-3 border border-gray-300 rounded-md bg-transparent"
								id="email"
								name="email"
								placeholder="Saisissez votre email de connexion"
								onChange={handleMatch}
								type="email"
								autoCorrect="off"
								autoComplete="email"
							/>
						</div>
						<Button
							variant="secondary"
							type="submit"
							disabled={isLoading || !isMatched}
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
