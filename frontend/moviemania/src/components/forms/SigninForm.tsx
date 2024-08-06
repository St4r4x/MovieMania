"use client";

import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { registerUserAction } from "@/src/data/actions/auth-actions";
import { cn } from "@/src/lib/utils";
import { ZodErrors } from "@/src/components/custom/ZodErrors";
import { Icons } from "@/src/components/icons/icons";
import { Button } from "@/src/components/ui/button";

const INITIAL_STATE = {
	data: null,
	zodErrors: null,
	message: null,
};

interface SigninFormProps {
	onNextClick: (data: FormData) => void;
}

export function SigninForm({ onNextClick }: SigninFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);
	const [message, setMessage] = useState<string | null>(null);
	const [formData, setFormData] = useState<FormData | null>(null);

	useEffect(() => {
		if (formState?.message === "Champs valident" && formData) {
			onNextClick(formData);
		}
	}, [formState?.message, formData, onNextClick]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		const formData = new FormData(event.target as HTMLFormElement);
		setFormData(formData);
		await formAction(formData);
		setIsLoading(false);
	};

	return (
		<div className={cn("grid gap-6")}>
			<form onSubmit={handleSubmit}>
				<div className="grid gap-4">
					<div className="grid gap-1">
						<label
							htmlFor="email"
							className="sr-only"
						>
							Email
						</label>
						<input
							className="p-3 border border-gray-300 rounded-md focus:border-primary focus:outline-none"
							id="email"
							name="email"
							placeholder="email@exemple.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
						/>
						<ZodErrors error={formState?.zodErrors?.email} />
					</div>
					<div className="grid gap-1">
						<label
							htmlFor="password"
							className="sr-only"
						>
							Password
						</label>
						<input
							className="p-3 border border-gray-300 rounded-md focus:border-primary focus:outline-none"
							id="password"
							name="password"
							placeholder="mot de passe"
							type="password"
							autoCorrect="off"
							disabled={isLoading}
						/>
						<ZodErrors error={formState?.zodErrors?.password} />
					</div>
					<Button disabled={isLoading}>
						{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
						VALIDER
					</Button>
				</div>
			</form>

			{message && <div className="mt-4 p-4 bg-green-500 text-white rounded-md">{message}</div>}

			<div className="relative flex items-center my-4">
				<div className="flex-grow border-t border-gray-300"></div>
				<span className="mx-4 text-xs uppercase text-muted-foreground text-white">Ou continuez avec</span>
				<div className="flex-grow border-t border-gray-300"></div>
			</div>

			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
			>
				{isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.google className="mr-5 h-4 w-4" />}
				Google
			</Button>
		</div>
	);
}
