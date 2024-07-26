"use client";

import React from "react";
import { useFormState } from "react-dom";
import { registerUserAction } from "@/data/actions/auth-actions";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { ZodErrors } from "@/components/custom/ZodErrors";

const INITIAL_STATE = {
	data: null,
	zodErrors: null,
	message: null,
};

export function SigninForm() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);

	console.log(formState, "client");

	return (
		<div className={cn("grid gap-6")}>
			<form action={formAction}>
				<div className="grid gap-4">
					<div className="grid gap-1">
						<div className="sr-only">Email</div>
						<input
							className="p-3 border border-gray-300 rounded-md"
							id="email"
							name="email"
							placeholder="email@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
						/>
						<ZodErrors error={formState?.zodErrors?.email} />
					</div>
					<div className="grid gap-1">
						<div className="sr-only">Password</div>
						<input
							className="p-3 border border-gray-300 rounded-md"
							id="password"
							name="password"
							placeholder="password"
							type="password"
							autoCorrect="off"
							disabled={isLoading}
						/>
						<ZodErrors error={formState?.zodErrors?.password} />
					</div>
					<Button disabled={isLoading}>
						{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
						Sign In with Email
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="px-2 text-muted-foreground text-white bg-black">Or continue with</span>
				</div>
			</div>
			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
			>
				{isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.google className="mr-5 h-4 w-4" />} Google
			</Button>
		</div>
	);
}
