import React from "react";
import SigninForm from "@/components/signin-form/SigninForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create an account",
	description: "Create an account forms to access our service.",
};

const SigninPage = () => {
	return (
		<main className="flex items-center justify-center min-h-screen w-full">
			<div className="w-auto p-10 rounded-3xl" style={{backgroundImage: 'linear-gradient(180deg, rgba(66,242,247,0.1) 0%, rgba(255,255,255,0.1) 100%)'}}>
				<div className="mx-auto flex w-full flex-col justify-center space-y-6">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold text-white">Create an account</h1>
						<p className="text-sm text-muted-foreground text-white">Enter your email below to create your account</p>
					</div>
					<SigninForm />
					<p className="text-center text-sm text-muted-foreground text-white">You have already an account ?{" "}
						<Link 
							href="/login"
							className="text-primary font-extrabold"
						>
							Login
						</Link>
					</p>
					<p className="px-8 text-center text-sm text-muted-foreground text-white">
						By clicking continue, you agree to our{" "}
						<Link
							href="/terms"
							className="underline underline-offset-4 hover:text-primary"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href="/privacy"
							className="underline underline-offset-4 hover:text-primary"
						>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</main>
	);
};

export default SigninPage;
