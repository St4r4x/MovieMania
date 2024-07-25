"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";

const SigninForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		try {
			const response = await axios({
				url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/open`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				data: JSON.stringify({
					email: formData.get("email"),
					password: formData.get("password"),
				}),
			});
			if (response.status === 200) {
				router.push("/login");
			}
		} catch (error) {
			NextResponse.json({ error });
		}
	}
	return (
		<div className={cn("grid gap-6")}>
			<form onSubmit={handleFormSubmit}>
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
};

export default SigninForm;
