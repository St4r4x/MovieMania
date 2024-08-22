"use client";

import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { loginUserAction } from "@/src/data/actions/auth-actions";

import { cn } from "@/src/lib/utils";
import { ZodErrors } from "@/src/components/custom/ZodErrors";
import { Icons } from "@/src/components/icons/icons";
import { Button } from "@/src/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const INITIAL_STATE = {
	data: null,
	zodErrors: null,
	message: null,
};
//! AJOUT DU CONTROLE DES CHAMPS
export function LoginForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState(false);
	// const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
	// const [message, setMessage] = useState<string | null>(null);

	// useEffect(() => {
	//    if (formState?.message) {
	//       setMessage(formState.message);
	//       if (formState.message === "Login successful!") {
	//          // Redirection vers une nouvelle page après succès
	//          setTimeout(() => {
	//             window.location.href = "/"; // Ajuste l'URL selon tes besoins
	//          }, 1000); // Temps d'attente avant redirection, ajustable
	//       }
	//    }
	// }, [formState?.message]);

	const [data, setData] = useState({
		username: "",
		password: "",
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		// await formAction(new FormData(event.target as HTMLFormElement));
		// setIsLoading(false);
		await signIn("credentials", {
			...data,
			redirect: false,
		}).then((response: any) => {
			if (response.error) {
				console.log(response.error);
				return;
			}
			setIsLoading(false);
			router.push("/");
		});
	};

	return (
		<div className={cn("grid gap-6")}>
			<form onSubmit={handleSubmit}>
				<div className="grid gap-4">
					<div className="grid gap-1">
						<div className="sr-only">Email</div>
						<input
							className="p-3 border border-gray-300 rounded-md focus:border-primary focus:outline-none"
							id="email"
							name="email"
							placeholder="Email"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							onChange={(e) => {
								setData({ ...data, username: e.target.value });
							}}
						/>
						{/* <ZodErrors error={formState?.zodErrors?.email} /> */}
					</div>
					<div className="grid gap-1">
						<div className="sr-only">Password</div>
						<input
							className="p-3 border border-gray-300 rounded-md focus:border-primary focus:outline-none"
							id="password"
							name="password"
							placeholder="Mot de passe"
							type="password"
							autoCorrect="off"
							disabled={isLoading}
							onChange={(e) => {
								setData({ ...data, password: e.target.value });
							}}
						/>
						{/* <ZodErrors error={formState?.zodErrors?.password} /> */}
					</div>
					<Button
						variant="default"
						disabled={isLoading}
					>
						{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
						VALIDER
					</Button>
				</div>
			</form>

			{/* Affichage du message */}
			{/* {message && <div className="mt-4 p-4 bg-green-500 text-white rounded-md">{message}</div>} */}

			<div className="relative flex items-center my-4">
				<div className="flex-grow border-t border-gray-300"></div>
				<span className="mx-4 text-xs uppercase text-muted-foreground text-white">Ou continuez avec</span>
				<div className="flex-grow border-t border-gray-300"></div>
			</div>

			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : isHovered ? (
					"Bientôt disponible"
				) : (
					<>
						<Icons.google className="mr-5 h-4 w-4" /> Google
					</>
				)}
			</Button>
		</div>
	);
}
