"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { deleteProfile } from "@/app/api/profile/updateProfile";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function DeleteForm({ user }: any) {
	const { data: session } = useSession();
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
		const result = await deleteProfile(session);
		if (result?.success) {
			signOut({ callbackUrl: "/signup" });
		} else {
			console.error("La suppression a échoué");
		}
		setIsLoading(false);
	};
	return (
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
	);
}

export default DeleteForm;
